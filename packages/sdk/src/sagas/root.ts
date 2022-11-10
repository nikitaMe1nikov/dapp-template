import { fork } from 'redux-saga/effects'
import { queryChannel } from '@nimel/sdk/sagas/query'
import { connect, init } from '@nimel/sdk/sagas/connect'

export function* root() {
  yield fork(rootQuery)
  yield fork(rootConnect)
}

export function* rootQuery() {
  yield fork(queryChannel)
}

export function* rootConnect() {
  yield fork(connect)
  yield fork(init)
}
