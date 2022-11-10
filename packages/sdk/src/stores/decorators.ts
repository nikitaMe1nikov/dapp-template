import { createActionAndEffect, DirectorrStoreClassConstructor } from '@nimel/directorr'

export const [actionDestroyStore, effectDestroyStore] = createActionAndEffect<{
  store: DirectorrStoreClassConstructor
}>('DESTROY_STORE')
