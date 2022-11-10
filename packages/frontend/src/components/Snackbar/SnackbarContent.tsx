import { Typography, useTheme, Theme } from '@mui/material'
import { Box } from 'components/Box'
import { FC } from 'react'
import { Button, ButtonProps } from 'components/Button'
import { CloseIcon } from 'components/Icon/CloseIcon'
import { useSnackbar, OptionsObject } from './useSnackbar'

const getBgcolor = (type: string, theme: Theme) => {
  switch (type) {
    case 'success': {
      return theme.palette.success.light
    }
    case 'error': {
      return theme.palette.error.light
    }
    case 'warning': {
      return theme.palette.warning.light
    }
  }
}

type SnackbarContentProps = Pick<ButtonProps, 'onClick'> & {
  variant: 'success' | 'error' | 'warning' | 'default' | 'info'
}

export const SnackbarContent: FC<SnackbarContentProps> = ({
  variant = 'success',
  children,
  onClick,
}) => {
  const theme = useTheme()

  return (
    <Box
      maxWidth='356px'
      position='relative'
      flexDirection='row'
      background={getBgcolor(variant, theme)}
      borderRadius='8px'
    >
      <Box ml={-5} p={2} pr={6} alignSelf='center'>
        <Typography variant='body2'>{children}</Typography>
      </Box>

      <Box position='absolute' top='0' right='-10px'>
        <Button variant='text' onClick={onClick}>
          <CloseIcon />
        </Button>
      </Box>
    </Box>
  )
}

export const SnackContent = (key: string, { message, variant = 'success' }: OptionsObject) => {
  const { closeSnackbar } = useSnackbar()

  return (
    <div id={key}>
      <SnackbarContent variant={variant} onClick={() => closeSnackbar(key)}>
        {message}
      </SnackbarContent>
    </div>
  )
}
