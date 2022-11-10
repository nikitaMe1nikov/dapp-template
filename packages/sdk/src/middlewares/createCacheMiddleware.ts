import { Middleware } from '@nimel/directorr'
import { actionQuery, actionQuerySuccess, QueryCache } from '@nimel/sdk/sagas'

export const createCacheMiddleware =
  (queryCache: QueryCache): Middleware =>
  (action, next) => {
    next(action)

    if (actionQuery.isAction(action)) {
      const {
        payload: { query, variables },
      } = action
      const cacheValue = queryCache.get([query?.name, variables])

      if (cacheValue)
        return next(
          actionQuerySuccess.createAction({
            query,
            variables,
            data: cacheValue,
          }),
        )
    }
  }
