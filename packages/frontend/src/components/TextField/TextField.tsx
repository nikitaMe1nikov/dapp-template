import {
  default as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField'
import { FC } from 'react'
import { styled } from '@mui/material/styles'

type AlignProps = { textalign?: string }
type TextFieldVariants = {
  variant?: 'filledCounter' | 'filled' | 'standard' | 'outlined'
}

export type TextFieldProps = Omit<MuiTextFieldProps, 'variant' | 'value'> &
  TextFieldVariants &
  AlignProps & { value: string | number }

const StyledMuiTextField = styled(MuiTextField)<TextFieldProps>`
  & input {
    text-align: ${({ textalign }) => textalign};
  }
` as FC<TextFieldProps>

export const TextField: FC<TextFieldProps> = ({ textalign = 'left', variant, ...rest }) => (
  <StyledMuiTextField
    className={variant} // workround for unsupport variant
    textalign={textalign}
    variant={variant !== 'filledCounter' ? variant : 'filled'}
    {...rest}
  />
)
