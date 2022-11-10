import { copyToClipboard } from 'utils/copyToClipboard'
import { useStore } from '@nimel/directorr-react'
import { NotificationStore } from 'components/Notification/NotificationStore'
import { useTranslation } from 'next-i18next'

export function useCopyClipboard() {
  const { open } = useStore(NotificationStore)
  const { t } = useTranslation('common')

  return {
    handleCopy: (copyText = '') => {
      copyToClipboard(copyText)
      open('success', t('Text copied'))
    },
  }
}
