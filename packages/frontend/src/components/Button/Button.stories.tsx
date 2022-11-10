import { ComponentStory, ComponentMeta } from '@storybook/react'
import Stack from '@mui/material/Stack'
import { CloseIcon } from '../Icon/CloseIcon'
import { Button } from './Button'

export default {
  title: 'components/Button',
  component: Button,
  argTypes: { onClick: { action: 'onClick' } },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => (
  <>
    <Stack direction='row' spacing={2}>
      <Button size='large' {...args}>
        Primary
      </Button>
      <Button size='large' disabled {...args}>
        Disabled
      </Button>
      <Button size='large' loading {...args}>
        Loading
      </Button>
      <Button size='large' href='#' {...args}>
        Link
      </Button>
      <Button size='large' startIcon={<CloseIcon />} endIcon={<CloseIcon />} {...args}>
        Primary
      </Button>
    </Stack>
    <Stack direction='row' spacing={2} my={4}>
      <Button size='medium' {...args}>
        Primary
      </Button>
      <Button size='medium' disabled {...args}>
        Disabled
      </Button>
      <Button size='medium' loading {...args}>
        Loading
      </Button>
      <Button size='medium' href='#' {...args}>
        Link
      </Button>
      <Button size='medium' startIcon={<CloseIcon />} endIcon={<CloseIcon />} {...args}>
        Primary
      </Button>
    </Stack>
    <Stack direction='row' spacing={2}>
      <Button size='small' {...args}>
        Primary
      </Button>
      <Button size='small' disabled {...args}>
        Disabled
      </Button>
      <Button size='small' loading {...args}>
        Loading
      </Button>
      <Button size='small' href='#' {...args}>
        Link
      </Button>
      <Button size='small' startIcon={<CloseIcon />} endIcon={<CloseIcon />} {...args}>
        Primary
      </Button>
    </Stack>
  </>
)

export const ButtonText = Template.bind({})

ButtonText.args = {
  variant: 'text',
}

export const ButtonOutlined = Template.bind({})

ButtonOutlined.args = {
  variant: 'outlined',
}

export const ButtonContained = Template.bind({})

ButtonContained.args = {
  variant: 'contained',
}

export const ButtonSimple = Template.bind({})

ButtonSimple.args = {
  variant: 'simple',
}

export const ButtonAction = Template.bind({})

ButtonAction.args = {
  variant: 'action',
}

export const ButtonBase = Template.bind({})

ButtonBase.args = {
  variant: 'base',
}
