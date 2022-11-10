import { IMaskMixin, IMask } from 'react-imask'
import { TextField, TextFieldProps } from './TextField'

export type TextMaskInputProps = IMask.AnyMaskedOptions &
  Omit<TextFieldProps, 'ref'> & { scale?: any; mask?: any }

const TextMaskInput = IMaskMixin<
  IMask.AnyMaskedOptions,
  true,
  string,
  IMask.MaskElement,
  TextFieldProps
>(({ inputRef, ...props }) => <TextField {...props} inputRef={inputRef} />)

export default TextMaskInput
