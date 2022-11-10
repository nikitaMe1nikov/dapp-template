import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
// eslint-disable-next-line import/no-extraneous-dependencies
import { OverridableStringUnion } from '@mui/types'
import { BreakpointOverrides } from '@mui/system/createTheme/createBreakpoints'

export type BreakpointUpdate = OverridableStringUnion<
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl',
  BreakpointOverrides
>

export function useBreakpoint() {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const lg = useMediaQuery(theme.breakpoints.only('lg'))
  const xl = useMediaQuery(theme.breakpoints.only('xl'))
  const xxl = useMediaQuery(theme.breakpoints.only('xxl'))
  const xxxl = useMediaQuery(theme.breakpoints.only('xxxl'))
  const container = useMediaQuery(theme.breakpoints.only('container'))

  const BREAKPOINTS = {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    xxxl,
    container,
  }

  return [...Object.entries(BREAKPOINTS)].find(([_, value]) => value)?.[0] as BreakpointUpdate
}
