import {
  useSnackbar as notyUseSnackbar,
  ProviderContext,
  OptionsObject as NotiOptionsObject,
} from 'notistack'
import { useCallback } from 'react'

export type OptionsObject = NotiOptionsObject & {
  message: string
}

export function useSnackbar() {
  const { enqueueSnackbar: notyEnqueueSnackbar, closeSnackbar } = notyUseSnackbar()

  const enqueueSnackbar: ProviderContext['enqueueSnackbar'] = useCallback(
    (message, options) => notyEnqueueSnackbar({ message, ...options }, options),
    [notyEnqueueSnackbar],
  )

  return {
    enqueueSnackbar,
    closeSnackbar,
  }
}
