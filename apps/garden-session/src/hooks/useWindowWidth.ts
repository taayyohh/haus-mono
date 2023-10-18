import { useMemo, useEffect, useState } from 'react'
import { useIsMounted } from '@/hooks/useIsMounted'

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<undefined | number>(undefined)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (isMounted) {
      setWindowWidth(window.innerWidth)
    }
  }, [isMounted, setWindowWidth])

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isXs = useMemo(() => (windowWidth ? windowWidth >= 420 : true), [windowWidth])

  const isSm = useMemo(() => (windowWidth ? windowWidth >= 480 : true), [windowWidth])

  const isMd = useMemo(() => (windowWidth ? windowWidth >= 768 : true), [windowWidth])

  const isLg = useMemo(() => (windowWidth ? windowWidth >= 1024 : true), [windowWidth])

  const isXl = useMemo(() => (windowWidth ? windowWidth >= 1280 : true), [windowWidth])

  const isXXl = useMemo(() => (windowWidth ? windowWidth >= 1536 : true), [windowWidth])

  const isXXXl = useMemo(() => (windowWidth ? windowWidth >= 1900 : true), [windowWidth])

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXXl,
    isXXXl,
    windowWidth,
  }
}
