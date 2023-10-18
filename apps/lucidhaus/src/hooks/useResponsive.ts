import { useWindowWidth } from './useWindowWidth'

type ResponsiveDetails = {
  isMobile: boolean
}

export function useResponsive(): ResponsiveDetails {
  const { isLg } = useWindowWidth()

  const isMobile = !isLg

  return {
    isMobile,
  }
}
