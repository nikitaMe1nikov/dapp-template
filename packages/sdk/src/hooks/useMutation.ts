import { Query } from '@nimel/sdk/sagas'
import { QueryOptions, useQuery } from './useQuery'

export function useMutation<
  Q extends Query,
  V extends Parameters<Q>[0]['variables'] = Parameters<Q>[0]['variables'],
>(query: Q, options: Omit<QueryOptions<V>, 'watchChainChanging' | 'initVariables'> = {}) {
  return useQuery(query, { ...options, watchChainChanging: false })
}
