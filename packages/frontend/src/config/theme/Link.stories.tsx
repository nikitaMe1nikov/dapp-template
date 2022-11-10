import { ComponentMeta, ComponentStory } from '@storybook/react'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'

const LinkBlock = () => (
  <>
    <Stack direction='row' spacing={2}>
      <Link variant='subtitle2'>subtitle2</Link>
      <Link variant='subtitle2alt'>subtitle2alt</Link>
    </Stack>
    <Stack direction='row' spacing={2}>
      <Link variant='subtitle1'>subtitle1</Link>
      <Link variant='subtitle1alt'>subtitle1alt</Link>
    </Stack>
  </>
)

export default {
  title: 'components/Link',
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof LinkBlock> = () => <LinkBlock />

export const LinkSizes = Template.bind({})
