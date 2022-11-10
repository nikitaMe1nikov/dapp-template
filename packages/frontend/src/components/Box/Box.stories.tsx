import { Typography } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box } from './Box'

export default {
  title: 'components/Box',
  component: Box,
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = () => (
  <>
    <Typography mb={5} variant='h4' color='text.secondary'>
      Box column
    </Typography>
    <Box mb={4}>
      <Box bgcolor='red' height='50px' />
      <Box bgcolor='green' height='50px' />
      <Box bgcolor='blue' height='50px' />
    </Box>
    <Typography mb={5} variant='h4' color='text.secondary'>
      Box row, background + opacity
    </Typography>
    <Box flexDirection='row'>
      <Box
        background='url(posters/poster_main_360.png) no-repeat center center/cover'
        height='50px'
        width='30%'
      />
      <Box
        background='url(posters/poster_main_360.png) no-repeat center center/cover'
        height='50px'
        width='30%'
        opacity={0.3}
      />
    </Box>
  </>
)

export const BoxContainer = Template.bind({})
