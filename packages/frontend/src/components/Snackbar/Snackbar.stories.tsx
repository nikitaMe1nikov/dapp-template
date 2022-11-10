import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button } from 'components/Button'
import { SnackbarProvider } from './SnackbarProvider'
import { useSnackbar } from './useSnackbar'

const SnackBlock = () => {
  const { enqueueSnackbar } = useSnackbar()
  const showSnack = () => {
    enqueueSnackbar('some message', { variant: 'success' })
  }

  return <Button onClick={showSnack}>show snack</Button>
}

export default {
  title: 'components/Snackbar',
  component: SnackBlock,
  decorators: [
    (Story, context) => (
      <SnackbarProvider>
        <Story {...context} />
      </SnackbarProvider>
    ),
  ],
} as ComponentMeta<typeof SnackBlock>

const Template: ComponentStory<typeof SnackBlock> = () => <SnackBlock />

export const DefaultSnack = Template.bind({})
