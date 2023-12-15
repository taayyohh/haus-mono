import { describe, it, expect } from 'vitest'
import { hhmmss } from '../utils/hhmmss'

describe('hhmmss', () => {
  it('should take seconds and return a formatted time - minutes : seconds', () => {
    let seconds = '100'
    const formattedTime = hhmmss(seconds)
    expect(formattedTime).toEqual('01:40')
  })
})
