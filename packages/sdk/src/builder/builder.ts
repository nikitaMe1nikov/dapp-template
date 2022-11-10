import '@nimel/sdk/config/directorr'
import { Directorr, DirectorrStoreClassConstructor } from '@nimel/directorr'
import createSagaMiddleware from 'redux-saga'
import { root, QUERY_CONTEXT, QUERY_CACHE_CONTEXT, DISPATCH_CONTEXT } from '@nimel/sdk/sagas'
import { logMiddleware, errorShowMiddleware, destroyStoreMiddleware } from '@nimel/sdk/middlewares'
import { IS_DEV, IS_SERVER } from '@nimel/sdk/config/env'
import merge from 'lodash/merge'

export const DEFAULT_OPTIONS = {
  middlewares: IS_DEV
    ? [logMiddleware, destroyStoreMiddleware, errorShowMiddleware]
    : [destroyStoreMiddleware, errorShowMiddleware],
  rootSaga: root,
}

export function createBuilder(createOptions = DEFAULT_OPTIONS) {
  const { middlewares } = merge({}, DEFAULT_OPTIONS, createOptions)
  const directorr = new Directorr()

  if (!IS_SERVER) {
    directorr.addMiddlewares(middlewares)

    const sagaMiddleware = createSagaMiddleware({
      context: {
        [QUERY_CONTEXT]: {},
        [QUERY_CACHE_CONTEXT]: {},
        [DISPATCH_CONTEXT]: directorr.dispatch,
      },
    })

    directorr.addReduxMiddlewares([sagaMiddleware])
    sagaMiddleware.run(root)

    if (IS_DEV) {
      ;(global as any).dirtr = directorr
    }
  }

  return {
    builder: <I>(StoreConstructor: DirectorrStoreClassConstructor<I>): I =>
      directorr.addStore(StoreConstructor),
    directorr,
  }
}
