import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Stack, Typography } from '@mui/material'
import { Box } from 'components/Box'
import SelectCustom from './Select'

export default {
  title: 'components/Select',
  component: SelectCustom,
  argTypes: { onClick: { action: 'onClick' } },
} as ComponentMeta<typeof SelectCustom>

const Template: ComponentStory<typeof SelectCustom> = args => (
  <Box pb={4}>
    <Stack direction='row' spacing={2} mb={4}>
      <Box>
        <Typography sx={{ mb: 3 }} variant='h4' color='text.secondary'>
          Size small
        </Typography>
        <SelectCustom size='small' {...args} />
      </Box>
    </Stack>
    <Stack direction='row' spacing={2} mb={4}>
      <Box>
        <Typography sx={{ mb: 3 }} variant='h4' color='text.secondary'>
          Size medium
        </Typography>
        <SelectCustom size='medium' {...args} />
      </Box>
    </Stack>
    <Stack direction='row' spacing={2} mb={4}>
      <Box>
        <Typography sx={{ mb: 3 }} variant='h4' color='text.secondary'>
          Size large
        </Typography>
        <SelectCustom size='large' {...args} />
      </Box>
    </Stack>
  </Box>
)

export const SelectOutlined = Template.bind({})
SelectOutlined.args = {
  variant: 'outlined',
  name: 'token',
  value: 'token',
  handleChange: () => null,
  options: [
    { name: 'Token', value: 'token' },
    { name: 'AVAX', value: 'avax' },
  ],
}

export const SelectFilled = Template.bind({})
SelectFilled.args = {
  variant: 'filled',
  name: 'token',
  value: 'token',
  handleChange: () => null,
  options: [
    { name: 'TOKEN', value: 'token' },
    { name: 'AVAX', value: 'avax' },
  ],
}
