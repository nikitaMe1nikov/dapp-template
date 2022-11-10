import { useCallback, useState } from 'react'

export type ModalProps = ReturnType<typeof useModal>

export function useModal(value = false) {
  const [isOpen, setOpen] = useState(value)

  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])
  const toggleModal = useCallback(() => setOpen(v => !v), [])

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  }
}
