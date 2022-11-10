import { put, call, fork, takeEvery, cancel, actionChannel, take } from 'typed-redux-saga/macro'
import { Channel } from 'redux-saga'
import { Action, createActionAndEffect } from '@nimel/directorr'
import { getQueryContext, QueryContext, getQueryCacheContext } from '@nimel/sdk/sagas/context'
import { ErrorCode } from '@nimel/sdk/config/error'
import { ReturnPromiseType } from '@nimel/sdk/types'
import { actionContextReady, actionContextInit } from '@nimel/sdk/sagas/decorators'
import { createUniqKey } from '@nimel/sdk/sagas/utils'

export const [
  actionQuery,
  effectQuery,
  actionQuerySuccess,
  effectQuerySuccess,
  actionQueryError,
  effectQueryError,
  actionQueryLoading,
  effectQueryLoading,
] = createActionAndEffect<
  DataQueryPayload,
  DataQueryPayloadSuccess,
  DataQueryPayloadError,
  DataQueryPayload
>('QUERY')

export type Variables = any

export type QueryArg<V extends Variables = unknown> = {
  ctx: QueryContext
  variables: V
}

export type Query<V extends Variables = Variables, R = any> = ({
  ctx,
  variables,
}: QueryArg<V>) => Promise<R> | R

export type ReturnTypeQuery<Q extends Query> = ReturnPromiseType<ReturnType<Q>>

export interface DataQueryPayload<Q extends Query = Query, V = any> {
  query: Q
  variables: V
  pollingInterval?: number
}

export interface DataQueryPayloadSuccess<Q extends Query = Query, V = any>
  extends DataQueryPayload<Q, V> {
  data: ReturnPromiseType<ReturnType<Q>>
}

export interface DataQueryPayloadError<Q extends Query = Query, V = any>
  extends DataQueryPayload<Q, V> {
  error: ErrorCode
}

function* getQuery({ payload: { query, variables } }: Action<string, DataQueryPayload>) {
  const queryContext = yield* getQueryContext()
  const { runner } = yield* getQueryCacheContext()

  yield put(actionQueryLoading.createAction({ query, variables }))

  const key = createUniqKey([query.name, variables])
  const isPending = runner.isPending(key)

  if (isPending) return

  runner.setPending(key)

  try {
    const data = yield* call(query, { ctx: queryContext, variables })
    runner.resolve(key, data)

    yield put(actionQuerySuccess.createAction({ query, variables, data }))
  } catch (error: any) {
    runner.reject(key, error)

    yield put(actionQueryError.createAction({ query, variables, error }))
  }
}

export function* queryWatch(channel: Channel<Action>) {
  yield takeEvery(channel, getQuery)
}

export function* queryChannel() {
  const channel = yield* actionChannel(actionQuery.type)

  while (true) {
    yield take(actionContextReady.type)

    const task = yield* fork(queryWatch, channel)

    yield* take([actionContextInit.type])

    channel.flush(() => {})

    yield cancel(task)
  }
}
