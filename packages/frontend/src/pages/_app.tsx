import 'config/dayjs'
import 'swiper/swiper.scss'
import 'config/yup'
import { FC } from 'react'
import { AppProps } from 'next/app'
import { DirectorrProvider } from '@nimel/directorr-react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createEmotionCache, EmotionCache } from 'utils/createEmotionCache'
import { darkTheme } from 'config/theme'
import { IS_DEV, IS_SERVER, createBuilder } from '@nimel/sdk'
import { SnackbarProvider } from 'components/Snackbar'
import { Notification } from 'components/Notification/Notification'
import { appWithTranslation } from 'next-i18next'

if (!IS_SERVER && IS_DEV && window && window.outerWidth <= 800) {
  void import('eruda').then(eruda => {
    eruda.default.init()

    const button = document
      .querySelector('html > div:nth-child(4)')
      ?.shadowRoot?.querySelector('#eruda')

    if (button) (button as any).style.zIndex = 99_999_999_999_999
  })
}

const clientSideEmotionCache = createEmotionCache()
const { directorr } = createBuilder()

export const App: FC<AppProps & { emotionCache: EmotionCache }> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => (
  <DirectorrProvider value={directorr}>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider>
          <CssBaseline />
          <Component {...pageProps} />
          <Notification />
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  </DirectorrProvider>
)

export default appWithTranslation(App)
