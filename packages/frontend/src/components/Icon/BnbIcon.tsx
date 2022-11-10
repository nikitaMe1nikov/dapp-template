import { FC } from 'react'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const BnbIcon: FC<SvgIconProps> = props => (
  <SvgIcon viewBox='0 0 24 24 ' {...props}>
    <circle cx='12' cy='12' r='12' fill='#F0B90B' />
    <path
      d='M11.9649 4L13.9381 6.02079L8.96934 10.9896L6.99609 9.01631L11.9649 4Z'
      fill='#EDF0F4'
    />
    <path
      d='M14.9604 6.99561L16.9336 9.01639L8.96933 16.9807L6.99609 15.0074L14.9604 6.99561Z'
      fill='#EDF0F4'
    />
    <path
      d='M5.97324 9.99097L7.94648 12.0118L5.97324 13.985L4 12.0118L5.97324 9.99097Z'
      fill='#EDF0F4'
    />
    <path
      d='M17.9545 9.99097L19.9278 12.0118L11.9635 19.976L9.99023 18.0028L17.9545 9.99097Z'
      fill='#EDF0F4'
    />
  </SvgIcon>
)
