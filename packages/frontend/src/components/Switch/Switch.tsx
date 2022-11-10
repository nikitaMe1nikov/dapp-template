import { FC } from 'react'
import { default as MuiSwitch, SwitchProps as MUISwitchProps } from '@mui/material/Switch'

export const Switch: FC<MUISwitchProps> = props => (
  <MuiSwitch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
)
