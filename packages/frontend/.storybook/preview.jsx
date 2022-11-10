import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from '../src/config/theme'
import '../src/config/yup'
import { CssBaseline } from '@mui/material'
import * as NextImage from 'next/image'
import { CacheProvider } from '@emotion/react'
import { DirectorrProvider } from '@nimel/directorr-react'
import { withNextRouter } from '@gogaille/storybook-addon-next-router'
import { SnackbarProvider } from 'components/Snackbar'
import { createEmotionCache } from '../src/utils/createEmotionCache'
import { Notification } from '../src/components/Notification/Notification'
import {
  createBuilder,
  DEFAULT_OPTIONS,
  actionConnectSuccess,
  createCacheMiddleware,
  rootQuery,
  QueryCache,
  getBlockNumber,
} from '@nimel/sdk'
// eslint-disable-next-line import/no-extraneous-dependencies
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

const clientSideEmotionCache = createEmotionCache()

const viewports = Object.entries(darkTheme.breakpoints.values).map(([name, size]) => ({
  name,
  styles: {
    width: `${size || 360}px`,
    height: '100%',
  },
}))

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports,
  },
}

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => (
    <OriginalNextImage
      {...props}
      unoptimized
      blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z'
    />
  ),
})

const queryCache = new QueryCache([], Number.MAX_SAFE_INTEGER)

queryCache.set([getBlockNumber.name, {}], 12)

const cacheMiddleware = createCacheMiddleware(queryCache)

const { directorr } = createBuilder({
  middlewares: [...DEFAULT_OPTIONS.middlewares, cacheMiddleware],
  rootSaga: rootQuery,
})

directorr.dispatchType(actionConnectSuccess.type)

const withThemeProvider = (Story, context) => (
  <DirectorrProvider value={directorr}>
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider>
          <CssBaseline />
          <Story {...context} />
          <Notification />
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  </DirectorrProvider>
)

const withi8nProvider = (Story, context) => (
  <I18nextProvider i18n={i18n}>
    <Story {...context} />
  </I18nextProvider>
)

export const decorators = [withNextRouter, withThemeProvider, withi8nProvider]
