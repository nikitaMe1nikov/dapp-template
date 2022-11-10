import { FC } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { InputBaseProps } from '@mui/material'

type SelectCustomProps = {
  value: string
  handleChange: (e: string | SelectChangeEvent<string>) => void
  options: Record<string, any>[]
  name: string
  variant?: FormControlProps['variant']
  size?: InputBaseProps['size']
  keyName?: string
  keyValue?: string
}

const SelectCustom: FC<SelectCustomProps> = ({
  value,
  handleChange,
  options,
  name,
  variant = 'outlined',
  size = 'medium',
  keyName = 'name',
  keyValue = 'value',
}) => (
  <FormControl variant={variant} fullWidth>
    <Select
      size={size}
      labelId='select-filled-label'
      id='select-filled'
      value={value}
      onChange={handleChange}
      name={name}
      fullWidth
    >
      {options?.map(el => (
        <MenuItem key={el[keyValue]} value={el[keyValue]}>
          {el[keyName]}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)
export default SelectCustom
