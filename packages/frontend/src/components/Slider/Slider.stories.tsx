import { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box } from 'components/Box'
import { Slider } from './Slider'

export default {
  title: 'components/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>

const minDistance = 10

const Template: ComponentStory<typeof Slider> = () => {
  const [value, setValue] = useState<number[]>([0, 80])
  const handleChange = (_: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return null

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
    }
  }

  return (
    <Box width='100%' maxWidth='500px' ml={2}>
      <Box mb={5} />
      <Slider value={value} onChange={handleChange} valueLabelDisplay='auto' />
      <Box mb={5} />
      <Slider value={value} onChange={handleChange} valueLabelDisplay='auto' disabled />
    </Box>
  )
}

export const SliderExample = Template.bind({})
