import { ComponentMeta, ComponentStory } from '@storybook/react'
import { NotificationStore } from './NotificationStore'
import { useStore } from '@nimel/directorr-react'
import { Button } from 'components/Button'

const SnackBlock = () => {
  const { open } = useStore(NotificationStore)

  return <Button onClick={() => open('success', 'New notification')}>show notification</Button>
}

export default {
  title: 'components/Notification',
  component: SnackBlock,
} as ComponentMeta<typeof SnackBlock>

const Template: ComponentStory<typeof SnackBlock> = () => <SnackBlock />

export const DefaultSnack = Template.bind({})
