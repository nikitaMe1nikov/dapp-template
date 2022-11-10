import { FC } from 'react'
// import { SnackContent } from './SnackbarContent'
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack'

export const SnackbarProvider: FC = ({ children }) => (
  <NotistackSnackbarProvider
    maxSnack={5}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    // content={SnackContent}
  >
    {children}
  </NotistackSnackbarProvider>
)
