import { FC } from 'react'
import { styled } from '@mui/material/styles'
import { default as MuiRadio } from '@mui/material/Radio'
import { RadioProps } from '@mui/material'

const BpIcon = styled('span')`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: ${({ theme }) => theme.palette.background.default};

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  &:disabled {
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`

const BpCheckedIcon = styled(BpIcon)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.1), hsla(0, 0%, 100%, 0));
  &:before {
    display: block;
    width: 20px;
    height: 20px;
    background-image: radial-gradient(#fff, #fff 28%, transparent 32%);
    content: '';
  }
  border: none;
  input:hover ~ & {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    border: none;
  }
  input:disabled ~ & {
    background-color: ${({ theme }) => theme.palette.alpha[10]};
    border: none;
    &:before {
      display: block;
      width: 20px;
      height: 20px;
      background-image: radial-gradient(#8c888c, #8c888c 28%, transparent 32%);
      content: '';
    }
  }
`

export const Radio: FC<RadioProps> = props => (
  <MuiRadio
    sx={{
      '&:hover': {
        bgcolor: 'transparent',
      },
    }}
    disableRipple
    color='default'
    checkedIcon={<BpCheckedIcon />}
    icon={<BpIcon />}
    {...props}
  />
)
