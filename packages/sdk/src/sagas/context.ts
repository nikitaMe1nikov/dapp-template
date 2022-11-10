import { getContext, setContext } from 'typed-redux-saga/macro'
import { QUERY_CONTEXT, QUERY_CACHE_CONTEXT, DISPATCH_CONTEXT } from './constants'
import Web3 from 'web3'
import { Connector, ConnectorConfig } from '@nimel/sdk/config/wallet'
import { createContractFabric } from './utils'
import { QueryRunner } from './query/QueryRunner'
import { Directorr } from '@nimel/directorr'
import { ChainNames } from '../config/network'

export interface QueryContext {
  chainID: ChainNames
  account?: string
  web3: Web3
  createContract: ReturnType<typeof createContractFabric>
  connector?: Connector
  provider?: any
  connectorConfig?: ConnectorConfig
  runQuery: QueryRunner['runQuery']
}

export function* setQueryContext(newContext: QueryContext) {
  const context = yield* getContext<QueryContext>(QUERY_CONTEXT)

  yield setContext({
    [QUERY_CONTEXT]: Object.assign(context, newContext),
  })
}

export function* getQueryContext() {
  return yield* getContext<QueryContext>(QUERY_CONTEXT)
}

export function* resetQueryContext() {
  const context = yield* getContext<QueryContext>(QUERY_CONTEXT)

  yield setContext({
    [QUERY_CONTEXT]: Object.assign(context, {
      chainID: undefined,
      account: undefined,
      web3: undefined,
      provider: undefined,
      connector: undefined,
      connectorConfig: undefined,
      runQuery: undefined,
    }),
  })
}

export type QueryCacheContext = {
  runner: QueryRunner
}

export function* setQueryCacheContext(newContext: QueryCacheContext) {
  const context = yield* getContext<QueryCacheContext>(QUERY_CACHE_CONTEXT)

  yield setContext({
    [QUERY_CACHE_CONTEXT]: Object.assign(context, newContext),
  })
}

export function* getQueryCacheContext() {
  return yield* getContext<QueryCacheContext>(QUERY_CACHE_CONTEXT)
}

export function* resetQueryCacheContext() {
  const context = yield* getContext<QueryCacheContext>(QUERY_CACHE_CONTEXT)

  yield setContext({
    [QUERY_CACHE_CONTEXT]: Object.assign(context, {
      queue: undefined,
      runner: undefined,
    }),
  })
}

export function* getDispatchContext() {
  return yield* getContext<Directorr['dispatch']>(DISPATCH_CONTEXT)
}
