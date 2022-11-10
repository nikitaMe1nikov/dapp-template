import { Middleware } from '@nimel/directorr'
import { actionDestroyStore } from '@nimel/sdk/stores'

export const destroyStoreMiddleware: Middleware = (action, next, directorr) => {
  if (actionDestroyStore.isAction(action)) {
    return directorr.removeStore(action.payload.store)
  }

  next(action)
}
