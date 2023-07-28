#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const process = require('process')
const chalk = require('chalk')
const { Command } = require('commander')
const { addTheme, addThemeFragment } = require('../dist/cli/theming')

const program = new Command()

const importJSConfig = (path) => {
  console.log(chalk.yellow(`Using Reshaped config at ${path}`))
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const config = require(path)
  return config.default || config
}

program
  .description('Create new themes for Reshaped')
  .command('theming')
  .requiredOption('-o, --output <path>', 'Path to output generated themes')
  .option('-c, --config <path>', 'Path to the config file')
  .option(
    '--private',
    'Package private theme generation that also builds mixins and media queries'
  )
  .action(async (opts) => {
    const { output: outputPath, config: passedConfigPath, private } = opts
    const originPath = process.cwd()
    let configPath

    const cjsConfigPath = path.resolve(originPath, 'reshaped.config.cjs')
    const jsConfigPath = path.resolve(originPath, 'reshaped.config.js')
    const tsConfigPath = path.resolve(originPath, 'reshaped.config.ts')

    if (passedConfigPath) {
      const attemptPath = path.resolve(originPath, passedConfigPath)
      if (fs.existsSync(attemptPath)) configPath = attemptPath
    }

    ;[jsConfigPath, cjsConfigPath, tsConfigPath].forEach((p) => {
      if (!passedConfigPath && fs.existsSync(p)) configPath = p
    })

    if (!configPath) {
      console.error(chalk.red('Error: Reshaped config not found'))
      return
    }

    console.log(chalk.blue('Processing Reshaped themes...'))
    const config = importJSConfig(configPath)
    const { themes, themeFragments } = config
    const themeOptions = {
      ...config.themeOptions,
      generateOnColorsFor: [
        'backgroundNeutral',
        'backgroundPrimary',
        'backgroundCritical',
        'backgroundPositive',
        ...(config.themeOptions?.generateOnColorsFor || []),
      ],
    }

    if (themes) {
      Object.keys(themes).forEach((themeName) => {
        addTheme(themeName, themes[themeName], {
          outputPath,
          isPrivate: private,
          themeOptions,
        })
      })
    }

    if (themeFragments) {
      Object.keys(themeFragments).forEach((fragmentName) => {
        addThemeFragment(fragmentName, themeFragments[fragmentName], {
          outputPath,
          isPrivate: private,
          themeOptions,
        })
      })
    }
  })

program.parse(process.argv)
