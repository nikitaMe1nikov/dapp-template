import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Stack, IconButton } from '@mui/material'
import { CloseIcon } from '../Icon/CloseIcon'

export default {
  title: 'components/IconButton',
  component: IconButton,
  argTypes: { onClick: { action: 'onClick' } },
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = args => (
  <>
    <Stack direction='row' spacing={2}>
      <IconButton size='large' {...args}>
        <CloseIcon />
      </IconButton>
      <IconButton size='large' disabled {...args}>
        <CloseIcon />
      </IconButton>
    </Stack>
    <Stack direction='row' spacing={2}>
      <IconButton size='medium' {...args}>
        <CloseIcon />
      </IconButton>
      <IconButton size='medium' disabled {...args}>
        <CloseIcon />
      </IconButton>
    </Stack>
    <Stack direction='row' spacing={2}>
      <IconButton size='small' {...args}>
        <CloseIcon />
      </IconButton>
      <IconButton size='small' disabled {...args}>
        <CloseIcon />
      </IconButton>
    </Stack>
  </>
)

export const IconButtonAll = Template.bind({})
