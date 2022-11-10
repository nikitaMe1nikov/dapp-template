import React from 'react'
import { ComponentStory } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { Box } from '@mui/material'

export default {
  title: 'components/Checkbox',
  component: Checkbox,
  parameters: {
    actions: {},
  },
}

const Template: ComponentStory<typeof Checkbox> = args => (
  <Box p='25px'>
    <Checkbox {...args} />
  </Box>
)

export const CheckboxBase = Template.bind({})

CheckboxBase.args = {}
