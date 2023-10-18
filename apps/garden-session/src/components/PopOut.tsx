'use client'

import React, { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';

interface PopOutProps {
  trigger: React.ReactNode
  children?: React.ReactNode // Added this
  closeButton?: boolean
}

export const PopOut: React.FC<PopOutProps> = ({
  trigger,
  children,
  closeButton = false,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const popOutRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popOutRef.current && !popOutRef.current.contains(event.target as Node)) {
        // Cast event.target to Node
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setIsVisible(false)
  }, [pathname])

  return (
    <div ref={popOutRef} className="flex relative">
      <button onClick={() => setIsVisible(!isVisible)} className={'flex w-10 h-10'}>
        {trigger}
      </button>
      {isVisible && (
        <div className="absolute w-[91vw] sm:w-auto top-full right-0 mt-2 z-50 bg-[#131313] border rounded p-4 shadow-lg">
          {children}
          {closeButton && (
            <button
              className="mt-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => setIsVisible(false)}
            >
              Close
            </button>
          )}
        </div>
      )}
    </div>
  )
}
