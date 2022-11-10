import { Directorr } from '@nimel/directorr'
import { createUniqKey, UniqKey } from '../utils'
import { actionQuery, ReturnTypeQuery, Query } from './query'

type Callbacks = { resolve: any; reject: any; promise: Promise<unknown> }

export class QueryRunner {
  dispatch: Directorr['dispatch']

  constructor({ dispatch }: { dispatch: Directorr['dispatch'] }) {
    this.dispatch = dispatch
  }

  pending = new Set<string>()

  isPending(uniqKey: UniqKey) {
    return this.pending.has(uniqKey)
  }

  setPending(uniqKey: UniqKey) {
    return this.pending.add(uniqKey)
  }

  private removePending(uniqKey: UniqKey) {
    return this.pending.delete(uniqKey)
  }

  runnerMap = new Map<string, Callbacks>()

  isRunning(uniqKey: UniqKey) {
    return this.runnerMap.has(uniqKey)
  }

  createRunner<R>(uniqKey: UniqKey) {
    let resolve: any
    let reject: any
    // eslint-disable-next-line promise/param-names
    const promise = new Promise<R>((res, rej) => {
      resolve = res
      reject = rej
    })
    const runner = { resolve, reject, promise }

    this.runnerMap.set(uniqKey, runner)

    return runner
  }

  resolve(uniqKey: UniqKey, data: any) {
    const runner = this.runnerMap.get(uniqKey)

    this.removeQuery(uniqKey)
    this.removePending(uniqKey)

    if (runner) runner.resolve(data)
  }

  reject(uniqKey: UniqKey, error: any) {
    const runner = this.runnerMap.get(uniqKey)

    this.removeQuery(uniqKey)
    this.removePending(uniqKey)

    if (runner) runner.resolve(error)
  }

  private removeQuery(uniqKey: UniqKey) {
    return this.runnerMap.delete(uniqKey)
  }

  runQuery = <
    Q extends Query,
    V extends Parameters<Q>[0]['variables'] = Parameters<Q>[0]['variables'],
    R = ReturnTypeQuery<Q>,
  >(
    query: Q,
    variables: V,
  ): Promise<R> => {
    const key = createUniqKey([query.name, variables])
    // let resolve: any
    // let reject: any
    // // eslint-disable-next-line promise/param-names
    // const promise = new Promise<R>((res, rej) => {
    //   resolve = res
    //   reject = rej
    // })

    // this.runnerMap.set(key, { resolve, reject })
    const curentRunner = this.runnerMap.get(key)

    if (curentRunner) return curentRunner.promise as Promise<R>

    const runner = this.createRunner<R>(key)

    this.dispatch(actionQuery.createAction({ query, variables }))

    return runner.promise
  }
}
