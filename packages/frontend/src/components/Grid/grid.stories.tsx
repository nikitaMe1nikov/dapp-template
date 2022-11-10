import { FC } from 'react'
import { ComponentStory } from '@storybook/react'
import { Grid } from '.'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useBreakpoint } from 'hooks'

const GridContainer: FC = () => {
  const breakpoint = useBreakpoint()

  return (
    <>
      <Typography variant='h1'>{breakpoint}</Typography>
      <Grid container>
        <Grid item xs={2} sm={3} md={3} lg={5} xl={5} xxl={7}>
          <Box bgcolor='primary.main'>
            <Typography color='text.altPrimary'>item</Typography>
          </Box>
        </Grid>
        <Grid item xs={2} sm={1} md={3} lg={3} xl={5} xxl={3}>
          <Box bgcolor='primary.main'>
            <Typography color='text.altPrimary'>item</Typography>
          </Box>
        </Grid>
        <Grid item xs={2} sm={2} md={3} lg={4} xl={5} xxl={8}>
          <Grid
            container
            columns={{
              xs: 4,
              sm: 8,
              md: 4,
              lg: 8,
              xl: 4,
              xxl: 8,
              xxxl: 10,
            }}
            spacing={{
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2,
              xxxl: 2,
            }}
          >
            <Grid item xs={2} sm={4} md={2} lg={4} xl={2} xxl={2} xxxl={4}>
              <Box bgcolor='primary.main'>
                <Typography color='text.altPrimary'>item</Typography>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={2} lg={4} xl={2} xxl={6} xxxl={4}>
              <Box bgcolor='primary.main'>
                <Typography color='text.altPrimary'>item</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default {
  title: 'components/Grid',
  component: Grid,
}

const Template: ComponentStory<typeof GridContainer> = () => <GridContainer />

export const GridContainerAll = Template.bind({})
