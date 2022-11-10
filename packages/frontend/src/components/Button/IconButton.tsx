import { FC, forwardRef } from 'react'
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@mui/material'

export type IconButtonProps = MuiIconButtonProps & {
  variant: 'text' | 'contained' | 'square'
}

export const IconButton: FC<IconButtonProps> = forwardRef((props, ref) => (
  <MuiIconButton ref={ref} {...props} />
))
