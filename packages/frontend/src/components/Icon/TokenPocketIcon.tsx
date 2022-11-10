import { FC } from 'react'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const TokenPocketIcon: FC<SvgIconProps> = props => (
  <SvgIcon viewBox='0 0 24 24' {...props}>
    <path
      d='M10 3.00098H1C0.447715 3.00098 0 3.44869 0 4.00098V9.00098C0 9.55326 0.447715 10.001 1 10.001H4V22.001C4 22.5533 4.44772 23.001 5 23.001H9C9.55228 23.001 10 22.5533 10 22.001V3.00098Z'
      fill='#29AEFF'
    />
    <path
      d='M8 1.72825C8 1.32659 8.32561 1.00098 8.72727 1.00098H16.5C20.6421 1.00098 24 4.35884 24 8.50098C24 12.6431 20.6421 16.001 16.5 16.001H14V20.501C14 21.0533 13.5523 21.501 13 21.501H8V1.72825Z'
      fill='#2761E7'
    />
  </SvgIcon>
)
