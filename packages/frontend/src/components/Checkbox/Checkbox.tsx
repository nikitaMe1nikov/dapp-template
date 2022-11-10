import { FC } from 'react'
import { styled } from '@mui/material/styles'
import { default as MuiCheckbox } from '@mui/material/Checkbox'
import { CheckboxProps } from '@mui/material'

const BpIcon = styled('span')`
  width: 18px;
  height: 18px;
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
  border-radius: 2px;
  &:before {
    display: block;
    width: 18px;
    height: 18px;
    content: '';
    background-image: url(${'icons/ic_check_16.svg'});
    background-repeat: no-repeat;
    -webkit-background-position: 0.5px 1px;
    background-position: 0.5px 1px;
  }
  border: none;
  input:hover ~ & {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    border: none;
  }
  input:disabled ~ & {
    background-color: #ffffff33;
    border: none;
    &:before {
      display: block;
      width: 18px;
      height: 18px;
      content: '';
      background-image: url(${'icons/ic_check_16.svg'});
      opacity: 0.5;
      background-repeat: no-repeat;
      -webkit-background-position: 0.5px 1px;
      background-position: 0.5px 1px;
    }
  }
`

export const Checkbox: FC<CheckboxProps> = props => (
  <MuiCheckbox
    sx={{
      '&:hover': {
        bgcolor: 'transparent',
      },
    }}
    color='default'
    checkedIcon={<BpCheckedIcon />}
    icon={<BpIcon />}
    {...props}
  />
)
