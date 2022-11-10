import { SnackbarContent } from './SnackbarContent'
import { ComponentStory } from '@storybook/react'
import React from 'react'
import { Stack } from '@mui/material'

export default {
  component: SnackbarContent,
  title: 'components/Snackbar',
}

const Template: ComponentStory<typeof SnackbarContent> = () => (
  <Stack direction='column' spacing={2} width='50%'>
    <SnackbarContent variant='success'>
      The transaction completed successfully. The item has been moved.
    </SnackbarContent>

    <SnackbarContent variant='error'>
      The transaction completed successfully. The item has been moved.
    </SnackbarContent>

    <SnackbarContent variant='warning'>
      The transaction completed successfully. The item has been moved.
    </SnackbarContent>
  </Stack>
)

export const SnackbarContentVariants = Template.bind({})

// SnackbarContentVariants.args = {
//   variant: 'success',
// }
