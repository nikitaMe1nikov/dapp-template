import { whenState, whenDestroy } from '@nimel/directorr'
import { action, observable } from 'mobx'
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
  createUniqKey,
  UniqKey,
  ReturnTypeQuery,
} from '@nimel/sdk/sagas'
import isEqual from 'lodash/isEqual'
import { ErrorCode } from '@nimel/sdk/config/error'
import { actionDestroyStore } from './decorators'

export type { Query, QueryArg } from '@nimel/sdk/sagas'

function whenEqualLastQuery(
  { query, variables }: DataQueryPayload,
  { variablesByQuery }: QueryStore,
) {
  const waitVariables = variablesByQuery.get(query.name)

  return waitVariables && isEqual(variables, waitVariables)
}

const whenStateEqualLastQuery = whenState(whenEqualLastQuery)

export type QueryStoreOptions = {
  pollingInterval?: number
}

export class QueryStore {
  /**
   * data by queries
   */
  @observable.shallow dataByQuery = new Map<UniqKey, any>()

  /**
   * loading by queries
   */
  @observable.shallow loadingByQuery = new Set<UniqKey>()

  /**
   * error by queries
   */
  @observable.shallow errorByQuery = new Map<UniqKey, ErrorCode | Error>()

  /**
   * success by queries
   */
  @observable.shallow successByQuery = new Set<UniqKey>()

  /**
   * loaded by queries
   */
  @observable.shallow loadedByQuery = new Set<UniqKey>()

  /**
   * stale by queries
   */
  @observable.shallow staleByQuery = new Set<UniqKey>()

  /**
   * variables by queries
   */
  @observable.shallow variablesByQuery = new Map<UniqKey, any>()

  getVariables<Q extends Query, V = Parameters<Q>[0]['variables']>(query: Q): V | undefined {
    return this.variablesByQuery.get(query.name)
  }

  /**
   * internal, not for use
   */
  @observable.shallow private timeoutidByQuery = new Map<UniqKey, number>()

  /**
   * get data from query
   */
  getQueryData<Q extends Query, R = ReturnTypeQuery<Q> | undefined>(query: Q): R {
    return this.dataByQuery.get(createUniqKey([query.name, this.variablesByQuery.get(query.name)]))
  }

  /**
   * get loading status from query
   */
  isQueryLoading(query: Query) {
    return this.loadingByQuery.has(
      createUniqKey([query.name, this.variablesByQuery.get(query.name)]),
    )
  }

  /**
   * get error status from query
   */
  isQueryError(query: Query) {
    return !!this.haveQueryError(query)
  }

  /**
   * get error from query
   */
  haveQueryError(query: Query) {
    return this.errorByQuery.get(createUniqKey([query.name, this.variablesByQuery.get(query.name)]))
  }

  /**
   * get success status from query
   */
  isQuerySuccess(query: Query) {
    return this.successByQuery.has(
      createUniqKey([query.name, this.variablesByQuery.get(query.name)]),
    )
  }

  /**
   * get all data from query
   */
  getData<Q extends Query>(query: Q) {
    return {
      data: this.getQueryData<Q>(query),
      isLoading: this.isQueryLoading(query),
      error: this.haveQueryError(query),
      isSuccsess: this.isQuerySuccess(query),
    }
  }

  /**
   * clear polling for query
   */
  clearPolling = (key: UniqKey) => {
    const timeoutID = this.timeoutidByQuery.get(key)

    if (timeoutID) clearTimeout(timeoutID)
  }

  /**
   * run query with variables
   */
  @actionQuery
  getQuery = action(
    <Q extends Query, V extends Parameters<Q>[0]['variables'] = Parameters<Q>[0]['variables']>(
      query: Q,
      variables: V,
      pollingInterval?: number,
    ): DataQueryPayload<Q, V> => {
      const key = createUniqKey([query.name, variables as any])
      this.clearPolling(key)
      this.variablesByQuery.set(query.name, variables)

      return {
        query,
        variables,
        pollingInterval,
      }
    },
  )

  /**
   * internal, not for use
   */
  // @ts-ignore for decorator with private
  @effectQuery
  @whenStateEqualLastQuery
  private toQuery = ({ query, variables }: DataQueryPayload<Query, Variables>) => {
    const key = createUniqKey([query.name, variables])
    this.staleByQuery.add(key)
  }

  /**
   * internal, not for use
   */
  // @ts-ignore for decorator with private
  @effectQueryLoading
  @whenStateEqualLastQuery
  private whenLoading = ({ query, variables }: DataQueryPayload<Query, Variables>) => {
    const key = createUniqKey([query.name, variables])
    this.loadingByQuery.add(key)
    this.errorByQuery.delete(key)
    this.successByQuery.delete(key)
  }

  /**
   * internal, not for use
   */
  // @ts-ignore for decorator with private
  @effectQuerySuccess
  // @ts-ignore for decorator with private
  @effectQueryError
  @whenStateEqualLastQuery
  private endLoding = ({ query, variables }: DataQueryPayload<Query, Variables>) => {
    const key = createUniqKey([query.name, variables])
    this.loadingByQuery.delete(key)
    this.staleByQuery.delete(key)
  }

  /**
   * internal, not for use
   */
  // @ts-ignore for decorator with private
  @effectQueryError
  @whenStateEqualLastQuery
  private whenError = ({ error, query, variables }: DataQueryPayloadError<Query, Variables>) => {
    const key = createUniqKey([query.name, variables])
    this.errorByQuery.set(key, error)
    this.loadedByQuery.add(key)
    this.loadingByQuery.delete(key)
  }

  /**
   * internal, not for use
   */
  // @ts-ignore for decorator with private
  @effectQuerySuccess
  @whenStateEqualLastQuery
  private whenSuccess = ({
    query,
    variables,
    data,
    pollingInterval,
  }: DataQueryPayloadSuccess<Query, Variables>) => {
    const key = createUniqKey([query.name, variables])
    this.successByQuery.add(key)
    this.loadingByQuery.delete(key)
    this.loadedByQuery.add(key)
    this.dataByQuery.set(key, data)
    this.clearPolling(key)

    if (pollingInterval) {
      this.timeoutidByQuery.set(
        key,
        setTimeout(
          () => this.getQuery(query, variables, pollingInterval),
          pollingInterval,
        ) as unknown as number,
      )
    }
  }

  @actionDestroyStore
  destroy = () => ({ store: this.constructor as any })

  /**
   * internal, not for use
   */
  // @ts-ignore for decorator with private
  @whenDestroy
  private clear = () => {
    this.timeoutidByQuery.forEach(timeoutID => clearTimeout(timeoutID))
  }
}
