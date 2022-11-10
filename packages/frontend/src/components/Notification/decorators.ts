import { createActionAndEffect } from '@nimel/directorr'
import { OptionsObject } from 'components/Snackbar'

export type NotificationPayload = OptionsObject

export const [actionNotification, effectNotification] =
  createActionAndEffect<NotificationPayload>('NOTIFICATION')
