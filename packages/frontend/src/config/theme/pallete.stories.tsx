import { FC } from 'react'
import { ComponentStory } from '@storybook/react'
import Typography from '@mui/material/Typography'
import { Box } from 'components/Box'

type ColorBlockProps = {
  bgcolor: string
  designName: string
}

const ColorBlock: FC<ColorBlockProps> = ({ bgcolor, designName }) => (
  <Box flexDirection='row' alignItems='center' mt={4} ml={2}>
    <Box bgcolor={bgcolor} height={80} width={80} />
    <Typography width='334px' ml={6}>
      {designName}
    </Typography>
    <Typography>{bgcolor}</Typography>
  </Box>
)

const Pallete = () => (
  <>
    <ColorBlock bgcolor='background.default' designName='Bg/Primary' />
    <ColorBlock bgcolor='background.secondary' designName='Bg/Secondary' />

    <ColorBlock bgcolor='paper.bg' designName='Bg/Primary' />
    <ColorBlock bgcolor='controls.bg' designName='Bg/Controls' />
    <ColorBlock bgcolor='menu.bg' designName='Bg/Menu' />

    <ColorBlock bgcolor='text.primary' designName='Text/Primary' />
    <ColorBlock bgcolor='text.secondary' designName='Text/Secondary' />
    <ColorBlock bgcolor='text.altPrimary' designName='Text/Button' />
    <ColorBlock bgcolor='text.action' designName='Text/Action' />
    <ColorBlock bgcolor='text.icon' designName='Icons/Primary' />
    <ColorBlock bgcolor='text.primary' designName='Icons/Alternative' />
    <ColorBlock bgcolor='text.third' designName='Icons/Token' />

    <ColorBlock bgcolor='alpha.5' designName='Alpha White/05' />
    <ColorBlock bgcolor='alpha.10' designName='Alpha White/10' />
    <ColorBlock bgcolor='alpha.20' designName='Alpha White/20' />
    <ColorBlock bgcolor='alpha.30' designName='Alpha White/30' />
    <ColorBlock bgcolor='alpha.40' designName='Alpha White/40' />
    <ColorBlock bgcolor='alpha.60' designName='Alpha White/60' />

    <ColorBlock bgcolor='success.main' designName='Notifications/Success/Accent' />
    <ColorBlock bgcolor='warning.main' designName='Notifications/Warning/Accent' />
    <ColorBlock bgcolor='error.main' designName='Notifications/Error/Accent' />
    <ColorBlock bgcolor='info.main' designName='Notifications/Success/Accent' />
  </>
)

export default {
  title: 'components/Pallete',
  component: Pallete,
}

const Template: ComponentStory<typeof Pallete> = () => <Pallete />

export const PalleteAll = Template.bind({})
