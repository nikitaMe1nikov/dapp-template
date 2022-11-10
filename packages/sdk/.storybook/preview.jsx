import '../src/config/directorr'
import { DirectorrProvider } from '@nimel/directorr-react'
import { withNextRouter } from '@gogaille/storybook-addon-next-router'
import {
  getBlockNumber,
  createBuilder,
  DEFAULT_OPTIONS,
  actionConnectSuccess,
  createCacheMiddleware,
  rootQuery,
  QueryCache,
} from '@nimel/sdk'
// eslint-disable-next-line import/no-extraneous-dependencies

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
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
    <Story {...context} />
  </DirectorrProvider>
)

export const decorators = [withNextRouter, withThemeProvider]
