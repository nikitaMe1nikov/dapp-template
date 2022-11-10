import { Middleware } from '@nimel/directorr'
import { actionQueryError, actionConnectError } from '@nimel/sdk/sagas'

export const errorShowMiddleware: Middleware = (action, next) => {
  next(action)

  if (actionQueryError.isAction(action) || actionConnectError.isAction(action)) {
    console.error(action.payload.error)
  }
}
