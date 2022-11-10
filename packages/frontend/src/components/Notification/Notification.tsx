import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@nimel/directorr-react'
import { NotificationStore } from './NotificationStore'
import { useSnackbar } from 'components/Snackbar'

export const Notification: FC = observer(() => {
  const { payload } = useStore(NotificationStore)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (payload)
      enqueueSnackbar(payload.message, { variant: payload.variant, autoHideDuration: 5000 })
  }, [enqueueSnackbar, payload])

  return null
})
