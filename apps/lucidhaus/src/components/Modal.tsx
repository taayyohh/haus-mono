import React, { useRef, useState, useEffect } from 'react'

interface ModalProps {
  trigger?: React.ReactNode
  children?: React.ReactNode
  validateBeforeOpen?: () => Promise<boolean>
}

export const Modal: React.FC<ModalProps> = ({
  trigger,
  children,
  validateBeforeOpen,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleTriggerClick = async () => {
    if (validateBeforeOpen) {
      const shouldOpen = await validateBeforeOpen()
      setIsVisible(shouldOpen)
    } else {
      setIsVisible(true)
    }
  }

  return (
    <div ref={modalRef} className="relative">
      {trigger && <div onClick={handleTriggerClick}>{trigger}</div>}
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute w-full h-full bg-[#131313] opacity-50"></div>
          <div className="z-10 relative p-4 bg-[#131313] border border-white-13 rounded shadow-lg max-h-[75vh] overflow-hidden overflow-y-scroll w-full md:w-auto">
            {children}
            <button
              className="absolute top-3 right-5 mt-2 text-white bg-[#131313] hover:bg-[#111] rounded-full flex items-center justify-center border border-white-13 text-sm h-10 w-10"
              onClick={() => setIsVisible(false)}
            >
              <div className={'mt-0'}>x</div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal
