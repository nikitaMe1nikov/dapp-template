import { Action, Next, isFunction } from '@nimel/directorr'

export function logMiddleware(action: Action<string, any>, next: Next) {
  console.log(`${action.type} -`, isFunction(action.payload) ? action.payload.name : action.payload)
  next(action)
}
