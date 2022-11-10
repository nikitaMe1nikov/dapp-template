import { FC } from 'react'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const CloseIcon: FC<SvgIconProps> = props => (
  <SvgIcon viewBox='-6 -6 24 24' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.58586 5.99954L0.292969 1.70665L1.70718 0.292435L6.00008 4.58533L10.293 0.292435L11.7072 1.70665L7.41429 5.99954L11.7072 10.2924L10.293 11.7066L6.00008 7.41375L1.70718 11.7066L0.292969 10.2924L4.58586 5.99954Z'
    />
  </SvgIcon>
)
