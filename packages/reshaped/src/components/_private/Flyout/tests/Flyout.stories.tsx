import React from 'react'
import View from 'components/View'
import Theme from 'components/Theme'
import Button from 'components/Button'
import Flyout from 'components/_private/Flyout'

export default { title: 'Utilities/Internal/Flyout' }

const Demo = (props: any) => {
  const { position = 'bottom-start', children, ...rest } = props

  return (
    <Flyout triggerType="click" position={position} {...rest}>
      <Flyout.Trigger>
        {(attributes) => <button {...attributes}>{position}</button>}
      </Flyout.Trigger>
      <Flyout.Content>
        <div
          style={{
            background: 'var(--rs-color-background-elevation-overlay)',
            padding: 'var(--rs-unit-x4)',
            height: 100,
            width: 160,
            borderRadius: 'var(--rs-unit-radius-medium)',
            border: '1px solid var(--rs-color-border-neutral-faded)',
            boxSizing: 'border-box',
          }}
        >
          {children || 'Content'}
        </div>
      </Flyout.Content>
    </Flyout>
  )
}

export const positions = () => (
  <div style={{ paddingTop: 200 }}>
    <View gap={3} direction="row">
      <Demo position="bottom-start" />
      <Demo position="bottom-end" />
      <Demo position="bottom" />

      <Demo position="top-start" />
      <Demo position="top-end" />
      <Demo position="top" />

      <Demo position="end" />
      <Demo position="end-top" />
      <Demo position="end-bottom" />

      <Demo position="start" />
      <Demo position="start-top" />
      <Demo position="start-bottom" />
    </View>
  </div>
)

export const dynamicPosition = () => (
  <div style={{ position: 'absolute', top: 0, left: '50%' }}>
    <Demo position="top" />
  </div>
)

export const modeDialogClick = () => (
  <Demo position="bottom-start" trapFocusMode="dialog">
    <button type="button">Item 1</button>
    <button type="button">Item 2</button>
    <button type="button">Close</button>
  </Demo>
)

export const modeActionMenuClick = () => (
  <Demo position="bottom-start" trapFocusMode="action-menu">
    <button type="button">Item 1</button>
    <button type="button">Item 2</button>
    <button type="button">Close</button>
  </Demo>
)

export const modeContentMenuClick = () => (
  <Demo position="bottom-start" trapFocusMode="content-menu">
    <button type="button">Item 1</button>
    <button type="button">Item 2</button>
    <button type="button">Close</button>
  </Demo>
)

export const modeDialogHover = () => (
  <Demo position="bottom-start" trapFocusMode="dialog" triggerType="hover">
    <button type="button">Item 1</button>
    <button type="button">Item 2</button>
    <button type="button">Close</button>
  </Demo>
)

export const modeActionMenuHover = () => (
  <Demo position="bottom-start" trapFocusMode="action-menu" triggerType="hover">
    <button type="button">Item 1</button>
    <button type="button">Item 2</button>
    <button type="button">Close</button>
  </Demo>
)

export const modeContentMenuHover = () => (
  <Demo position="bottom-start" trapFocusMode="content-menu" triggerType="hover">
    <button type="button">Item 1</button>
    <button type="button">Item 2</button>
    <button type="button">Close</button>
  </Demo>
)

export const testWidthOverflowOnMobile = () => (
  <Demo position="bottom-start" width={600}>
    Should work on mobile
    <button type="button">Item 1</button>
    <button type="button">Item 2</button>
    <button type="button">Close</button>
  </Demo>
)

export const widthTrigger = () => (
  <Flyout triggerType="click" width="trigger" position="bottom">
    <Flyout.Trigger>
      {(attributes) => <button {...attributes}>Trigger with long text</button>}
    </Flyout.Trigger>
    <Flyout.Content>
      <div
        style={{
          background: 'var(--rs-color-background-elevation-overlay)',
          padding: 'var(--rs-unit-x4)',
          borderRadius: 'var(--rs-unit-radius-medium)',
          border: '1px solid var(--rs-color-border-neutral-faded)',
          boxSizing: 'border-box',
        }}
      ></div>
    </Flyout.Content>
  </Flyout>
)

export const scopedTheming = () => (
  <View gap={3} align="start">
    <Button color="primary">Reshaped button</Button>
    <Theme name="twitter">
      <Flyout triggerType="click" active position="bottom-start">
        <Flyout.Trigger>
          {(attributes) => (
            <Button color="primary" attributes={attributes}>
              Twitter button
            </Button>
          )}
        </Flyout.Trigger>
        <Flyout.Content>
          <div
            style={{
              background: 'var(--rs-color-background-elevation-overlay)',
              padding: 8,
              border: '1px solid var(--rs-color-border-neutral-faded)',
              boxSizing: 'border-box',
            }}
          >
            <View gap={1}>
              <View.Item>Portal content, rendered in body</View.Item>
              <Button color="primary">Twitter button</Button>
            </View>
          </div>
        </Flyout.Content>
      </Flyout>
    </Theme>
  </View>
)
