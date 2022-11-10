import { FC } from 'react'
import { ComponentStory } from '@storybook/react'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { useBreakpoint } from 'hooks'
import { Box } from 'components/Box'

type TextBlockProps = {
  variant: TypographyProps['variant']
  designName: string
}

const TextBlock: FC<TextBlockProps> = ({ designName, variant }) => (
  <Box flexDirection='row' alignItems='center' mt={4} ml={2}>
    <Typography width='140px' variant={variant}>
      Text
    </Typography>
    <Typography width='334px' ml={6}>
      {designName}
    </Typography>
    <Typography>{variant}</Typography>
  </Box>
)

const Typo = () => {
  const breakpoint = useBreakpoint()

  return (
    <>
      <Typography variant='h1'>{breakpoint}</Typography>
      <TextBlock variant='h1' designName='Title/H1' />
      <TextBlock variant='h2' designName='Title/H2' />
      <TextBlock variant='h3' designName='Title/H3' />
      <TextBlock variant='h4' designName='Title/H4' />
      <TextBlock variant='h5' designName='Title/H5' />
      <TextBlock variant='h6' designName='Title/H6' />
      <TextBlock variant='h7' designName='Tier/Large' />
      <TextBlock variant='h8' designName='Tier/Small' />
      <TextBlock variant='counter' designName='Tier[Medium counter]' />
      <TextBlock variant='buttonBig' designName='Button/Big' />
      <TextBlock variant='buttonSmall' designName='Button/Small' />
      <TextBlock variant='subtitle0' designName='Body/Value Big' />
      <TextBlock variant='subtitle1' designName='Body/Big [Regular]' />
      <TextBlock variant='subtitle1alt' designName='Body/Big [Medium]' />
      <TextBlock variant='subtitle2' designName='Body/Small [Regular]' />
      <TextBlock variant='subtitle2alt' designName='Body/Small [Medium]' />
      <TextBlock variant='subtitle3' designName='Body/Caption [Regular]' />
      <TextBlock variant='subtitle3alt' designName='Body/Caption [Medium]' />
      <TextBlock variant='subtitle4' designName='Label/Small [Regular]' />
      <TextBlock variant='subtitle4alt' designName='Label/Small [Bold]' />
      <TextBlock variant='subtitle5' designName='Label/Tiny' />
      <TextBlock variant='menu' designName='Body/Menu' />
      <TextBlock variant='largeTabs' designName='Body/Large Tabs' />
      <TextBlock variant='tinyTabs' designName='Body/Tiny Tabs' />
      <TextBlock variant='modalTitle' designName='Modal Title' />
      <TextBlock variant='tierSmall' designName='tier/Small' />
      <TextBlock variant='tierLarge' designName='tier/Large' />
    </>
  )
}

export default {
  title: 'components/Typography',
  component: Typo,
}

const Template: ComponentStory<typeof Typo> = () => <Typo />

export const TypographyAll = Template.bind({})
