import { FC } from 'react'
import { default as MuiSlider, SliderProps } from '@mui/material/Slider'

export const Slider: FC<SliderProps> = ({ ...rest }) => <MuiSlider {...rest} />
