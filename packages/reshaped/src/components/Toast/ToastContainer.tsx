'use client'

import React from 'react'
import { classNames } from 'utilities/helpers'
import { onNextFrame } from 'utilities/animation'
import { trapFocus, isKeyboardMode } from 'utilities/a11y'
import Toast from './Toast'
import ToastContext from './Toast.context'
import { timeouts } from './Toast.constants'
import type * as T from './Toast.types'
import s from './Toast.module.css'

const ToastContainer = (props: T.ContainerProps) => {
  const { toastProps, id, status, inspected, index } = props
  const { timeout = 'short' } = toastProps
  const { show, hide, remove } = React.useContext(ToastContext)
  const [toastHeight, setToastHeight] = React.useState<number>()
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()
  const resizingRef = React.useRef(false)
  const trapFocusRef = React.useRef<ReturnType<typeof trapFocus> | null>(null)
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const visible = status === 'entered'
  const containerClassNames = classNames(
    s.container,
    visible && s[`container--visible`],
    index === 0 && s[`container--index-${index}`],
    !inspected && (index === 1 || index === 2) && s[`container--index-${index}`],
    !inspected && index >= 3 && s['container--index-overflow']
  )

  const stopTimer = React.useCallback(() => {
    if (!timeoutRef.current) return
    clearTimeout(timeoutRef.current)
  }, [])

  const startTimer = React.useCallback(() => {
    stopTimer()

    const timeoutValue = typeof timeout === 'string' ? timeouts[timeout] : timeout
    if (timeout === 0) return

    timeoutRef.current = setTimeout(() => {
      hide(id)
    }, timeoutValue ?? timeouts.short)
  }, [hide, id, timeout, stopTimer])

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== 'height') return

    if (visible) return
    remove(id)
  }

  React.useEffect(() => {
    if (!visible) return

    if (inspected) {
      stopTimer()
    } else {
      startTimer()
    }
  }, [inspected, startTimer, stopTimer, visible])

  React.useEffect(() => {
    if (wrapperRef.current) {
      setToastHeight(wrapperRef.current.clientHeight)
    }

    show(id)
    startTimer()
  }, [show, id, startTimer])

  React.useEffect(() => {
    if (!wrapperRef.current) return

    if (visible) {
      trapFocusRef.current = trapFocus(wrapperRef.current, {
        includeTrigger: true,
        mode: 'content-menu',
      })
    } else if (trapFocusRef.current && isKeyboardMode()) {
      trapFocusRef.current()
      trapFocusRef.current = null
    }
  }, [visible])

  React.useEffect(() => {
    if (!visible || index > 0) return

    const handleResize = () => {
      resizingRef.current = true
      onNextFrame(() => {
        resizingRef.current = false
      })

      if (wrapperRef.current) {
        setToastHeight(wrapperRef.current.clientHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [visible, index])

  return (
    <li
      className={containerClassNames}
      style={{
        // Height + padding + borders
        height:
          status === 'entered' ? `calc(${toastHeight}px + var(--rs-unit-x2) + 2px)` : 0,
        // Disable transition when height of the toast can change
        transitionDuration: resizingRef.current ? '0s' : undefined,
      }}
      onTransitionEnd={handleTransitionEnd}
      onFocus={stopTimer}
      onBlur={startTimer}
    >
      <span className={s.wrapper}>
        <Toast
          {...toastProps}
          collapsed={index > 0 && !inspected}
          attributes={{ ref: wrapperRef }}
        />
      </span>
    </li>
  )
}

export default ToastContainer
