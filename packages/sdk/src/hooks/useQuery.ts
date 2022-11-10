import { useEffect, useRef } from 'react'
import { useStore } from '@nimel/directorr-react'
import { whenState, whenDestroy } from '@nimel/directorr'
import { observable, makeObservable } from 'mobx'
import {
  actionQuery,
  effectQuery,
  effectQueryLoading,
  DataQueryPayloadError,
  effectQueryError,
  effectQuerySuccess,
  DataQueryPayload,
  DataQueryPayloadSuccess,
  Query,
  Variables,
  effectContextReady,
} from '@nimel/sdk/sagas'
import { ReturnPromiseType } from '@nimel/sdk/types'
import isEqual from 'lodash/isEqual'
import { DEFAULT_ERROR_MESSAGE } from '../config/error'

export const EMPTY_INITVARIABLES = {
  initVariables: {},
}

function whenEqualLastQuery(
  { query, variables }: DataQueryPayload,
  { lastQuery, lastVariables, ignoreVariables }: DataQueryStore,
) {
  return query === lastQuery && (ignoreVariables || isEqual(variables, lastVariables))
}

export const whenStateEqualLastQuery = whenState(whenEqualLastQuery)

export class DataQueryStore<
  Q extends Query = Query,
  V = Parameters<Q>[0]['variables'],
  R = ReturnPromiseType<ReturnType<Q>>,
> {
  static storeName: string

  constructor({
    initVariables,
    ignoreVariables = false,
    pollingInterval = 0,
    watchChainChanging = true,
    lastQuery,
  }: QueryOptions & { lastQuery: Q }) {
    makeObservable(this)

    if (!this.isInit && initVariables) {
      this.isLoading = true
    }

    this.ignoreVariables = ignoreVariables
    this.pollingInterval = pollingInterval
    this.watchChainChanging = watchChainChanging
    this.lastQuery = lastQuery
  }

  /**
   * flag for loading query
   */
  @observable isLoading = false

  /**
   * flag for success query
   */
  @observable isSuccess = false

  /**
   * flag for error query
   */
  @observable isError = false

  /**
   * flag for init query
   */
  @observable isInit = false

  /**
   * flag for loaded query
   */
  @observable isLoaded = false

  /**
   * flag for stale query
   */
  @observable isStale = true

  /**
   * data from query
   */
  @observable.ref data?: R

  /**
   * error for last query
   */
  @observable error = 'init'

  /**
   * internal, not for use
   */
  lastQuery: Q

  /**
   * internal, not for use
   */
  lastVariables: V = {} as V

  /**
   * internal, not for use
   */
  pollingInterval = 0

  /**
   * internal, not for use
   */
  watchChainChanging = true

  /**
   * internal, not for use
   */
  timeoutID?: number = 0

  /**
   * internal, not for use
   */
  ignoreVariables?: boolean = false

  /**
   * internal, not for use
   */
  @whenDestroy
  clearPolling = () => {
    clearTimeout(this.timeoutID)
  }

  /**
   * run query with variables
   */
  getQuery = (variables: V) => {
    if (this.lastQuery) this.getFullQuery(this.lastQuery, variables)
  }

  /**
   * rerun query with last variables
   */
  reQuery = () => {
    if (this.lastQuery && this.lastVariables) this.getFullQuery(this.lastQuery, this.lastVariables)
  }

  /**
   * internal, not for use
   */
  @actionQuery
  getFullQuery = (query: Q, variables: V): DataQueryPayload<Q, V> => {
    this.lastQuery = query
    this.lastVariables = variables
    this.clearPolling()

    return {
      query,
      variables,
    }
  }

  /**
   * internal, not for use
   */
  @effectQuery
  @whenStateEqualLastQuery
  toQuery = () => {
    this.isInit = true
    this.isStale = true
  }

  /**
   * internal, not for use
   */
  @effectQueryLoading
  @whenStateEqualLastQuery
  whenLoading = () => {
    this.isLoading = true
    this.isError = false
    this.isSuccess = false
  }

  /**
   * internal, not for use
   */
  @effectQuerySuccess
  @effectQueryError
  @whenStateEqualLastQuery
  endLoding = () => {
    this.isLoading = false
    this.isStale = false
  }

  /**
   * internal, not for use
   */
  @effectQueryError
  @whenStateEqualLastQuery
  whenError = <QQ extends Query, VV extends Parameters<QQ>[0]['variables']>({
    error,
  }: DataQueryPayloadError<QQ, VV>) => {
    this.isError = true
    this.error = error.message || DEFAULT_ERROR_MESSAGE
    this.isLoaded = true
    this.isLoading = false
  }

  /**
   * internal, not for use
   */
  @effectQuerySuccess
  @whenStateEqualLastQuery
  whenSuccess = <QQ extends Query, VV extends Parameters<QQ>[0]['variables']>({
    data,
  }: DataQueryPayloadSuccess<QQ, VV>) => {
    this.isSuccess = true
    this.isLoading = false
    this.isLoaded = true
    this.data = data
    this.clearPolling()

    if (this.pollingInterval) {
      this.timeoutID = setTimeout(this.reQuery, this.pollingInterval) as unknown as number
    }
  }

  /**
   * internal, not for use
   */
  @effectContextReady
  whenContextReady = () => {
    if (this.isLoaded && this.watchChainChanging) this.reQuery()
  }
}

export type QueryOptions<V extends Variables = Variables> = {
  initVariables?: V
  pollingInterval?: number
  ignoreVariables?: boolean
  watchChainChanging?: boolean
}

export function useQuery<
  Q extends Query,
  V extends Parameters<Q>[0]['variables'] = Parameters<Q>[0]['variables'],
>(query: Q, options: QueryOptions<V> = {}) {
  const NewQueryStoreRef = useRef<typeof DataQueryStore>()

  if (!NewQueryStoreRef.current) {
    NewQueryStoreRef.current = class NewQueryStore extends DataQueryStore<Q> {
      static storeName = `${DataQueryStore.name}${Math.random()}`

      static storeInitOptions = { ...options, lastQuery: query }
    } as unknown as typeof DataQueryStore
  }

  const store = useStore<DataQueryStore<Q>>(NewQueryStoreRef.current)

  useEffect(() => {
    if (!store.isInit && options.initVariables) {
      store.getQuery(options.initVariables)
    }
  }, [store]) // eslint-disable-line react-hooks/exhaustive-deps

  return store
}
