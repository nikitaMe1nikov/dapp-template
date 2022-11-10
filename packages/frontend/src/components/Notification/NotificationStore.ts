import { observable, makeObservable } from 'mobx'
import { actionNotification, effectNotification } from './decorators'
import type { NotificationPayload } from './decorators'

export class NotificationStore {
  constructor() {
    makeObservable(this)
  }

  @observable.ref payload?: NotificationPayload

  @effectNotification
  whenNotification = (payload: NotificationPayload) => {
    this.payload = payload
  }

  @actionNotification
  open = (variant: NotificationPayload['variant'], message: NotificationPayload['message']) => ({
    variant,
    message,
  })
}
