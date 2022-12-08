import { take, put, call, fork, cancel, delay } from 'typed-redux-saga/macro'
import { Action } from '@nimel/directorr'
import { eventChannel } from 'redux-saga'
import web3Utils from 'web3-utils'
import { Chain } from 'wagmi'
import Web3 from 'web3'
import {
  setQueryContext,
  resetQueryContext,
  setQueryCacheContext,
  resetQueryCacheContext,
  getQueryContext,
  getDispatchContext,
} from './context'
import { ErrorCode } from '@nimel/sdk/config/error'
import {
  setNetworkChainID,
  getNetworkChainID,
  getChain,
  ChainNames,
  SUPPORT_CHAINS_IDS,
} from '@nimel/sdk/config/network'
import {
  setConnectorName,
  ConnectorConfig,
  ConnectorNames,
  resetConnectorName,
  getConnector,
} from '@nimel/sdk/config/wallet'
import { API_URL } from '@nimel/sdk/config/env'
import {
  actionConnect,
  LoginPayload,
  actionDisconnect,
  actionConnectLoading,
  actionConnectError,
  actionConnectSuccess,
  actionAccountsChanged,
  actionMessage,
  actionChainChanged,
  actionChainChangedError,
  ChainChangedPayload,
  actionConnected,
  actionChainToChange,
  ChainToChangePayload,
  actionDisconnected,
  actionContextReady,
  actionContextInit,
  actionConnectState,
} from './decorators'
import { getAnonimWeb3, switchNetwork, createContractFabric, getAxios } from './utils'
import { QueryRunner } from './query/QueryRunner'

const BLACK_LIST_SWITCH_CONNECTORS: ConnectorNames[] = ['walletConnect']
const ACCOUNTS_CHANGED_EVENT = 'accountsChanged'
const CONNECT_EVENT = 'connect'
const DISCONNECT_EVENT = 'disconnect'
const CHAIN_CHANGED_EVENT = 'chainChanged'
const MESSAGE_EVENT = 'message'
const BLACK_LIST_MESSAGE = ['MetaMask: Disconnected from chain']

export function* watchEtheriumAccountChanged(provider: any) {
  const channel = eventChannel<string[]>(emitter => {
    provider.on(ACCOUNTS_CHANGED_EVENT, emitter)

    return () => {
      provider.off(ACCOUNTS_CHANGED_EVENT, emitter)
    }
  })

  while (true) {
    const [account] = yield* take(channel)
    const { account: currentAccount } = yield* getQueryContext()

    if (account !== currentAccount) yield put(actionAccountsChanged.createAction({ account }))
  }
}

export function* watchEtheriumConnected(provider: any) {
  const channel = eventChannel(emitter => {
    provider.on(CONNECT_EVENT, emitter)

    return () => {
      provider.off(CONNECT_EVENT, emitter)
    }
  })

  while (true) {
    const { chainId } = yield take(channel)

    yield put(actionConnected.createAction({ chainID: web3Utils.hexToNumber(chainId) }))
  }
}

export function* watchEtheriumDisconnected(provider: any) {
  const channel = eventChannel<{ error: Error }>(emitter => {
    const handler = (error = ErrorCode.CODE_ERROR.network.disconnected) =>
      emitter({ error: typeof error === 'string' ? new Error(error) : error })
    provider.on(DISCONNECT_EVENT, handler)

    return () => {
      provider.off(DISCONNECT_EVENT, handler)
    }
  })

  while (true) {
    const { error } = yield* take(channel)
    const { account: currentAccount } = yield* getQueryContext()

    if (currentAccount && !BLACK_LIST_MESSAGE.some(m => error.message.includes(m))) {
      yield put(
        actionDisconnected.createAction({
          error: new ErrorCode(ErrorCode.CODE_ERROR.network.disconnected, error),
        }),
      )
    }
  }
}

export function* watchEtheriumChainChanged(provider: any) {
  const channel = eventChannel<string | { chainId: string }>(emitter => {
    provider.on(CHAIN_CHANGED_EVENT, emitter)

    return () => {
      provider.off(CHAIN_CHANGED_EVENT, emitter)
    }
  })

  while (true) {
    const payload = yield* take(channel)
    const { chainID: currentChainID } = yield* getQueryContext()

    const chainID = web3Utils.hexToNumber(
      typeof payload === 'string' || typeof payload === 'number' ? payload : payload.chainId,
    )

    if (currentChainID && chainID !== currentChainID)
      yield put(actionChainChanged.createAction({ chainID }))
  }
}

export function* watchEtheriumMessage(provider: any) {
  const channel = eventChannel<{ type: string }>(emitter => {
    provider.on(MESSAGE_EVENT, emitter)

    return () => {
      provider.off(MESSAGE_EVENT, emitter)
    }
  })

  while (true) {
    const message = yield* take(channel)

    yield put(actionMessage.createAction(message))
  }
}

export function* connectWallet(chain: Chain, connectorConfig: ConnectorConfig): unknown {
  yield put(actionConnectLoading.createAction())

  const axios = getAxios(API_URL)
  const connector = connectorConfig.createConnector(chain)

  try {
    try {
      yield call(() => connector.connect({ chainId: chain.id }))
    } catch (error) {
      yield call(() => connector.disconnect())

      return yield put(
        actionConnectError.createAction({
          error: new ErrorCode(ErrorCode.CODE_ERROR.connect.notFoundProvider, error),
        }),
      )
    }

    const provider = yield call(() => connector.getProvider())
    const account = yield* call(() => connector.getAccount())

    yield call(switchNetwork, chain, provider)

    const web3 = new Web3(provider)

    yield call(setConnectorName, connectorConfig.type)
    yield call(setNetworkChainID, chain.id)

    yield fork(watchEtheriumAccountChanged, provider)
    yield fork(watchEtheriumConnected, provider)
    yield fork(watchEtheriumDisconnected, provider)
    yield fork(watchEtheriumChainChanged, provider)

    const createContract = createContractFabric(web3, chain.id)
    const dispatch = yield* getDispatchContext()
    const runner = new QueryRunner({ dispatch })

    yield call(setQueryContext, {
      chainID: chain.id as ChainNames,
      account,
      web3,
      createContract,
      axios,
      connector,
      provider,
      type: connectorConfig.type,
      runQuery: runner.runQuery,
    })
    yield call(setQueryCacheContext, {
      runner,
    })

    yield put(
      actionConnectSuccess.createAction({
        chainID: chain.id,
        account,
        web3,
        connectorConfig,
      }),
    )
    yield put(actionContextReady.createAction())
  } catch (error) {
    yield call(() => connector.disconnect())
    yield call(resetConnectorName)

    yield put(
      actionConnectError.createAction({
        error: new ErrorCode(ErrorCode.CODE_ERROR.unknown, error),
      }),
    )
  }
}

export function* initAnonimContext() {
  const chainID = getNetworkChainID()
  const chain = getChain(chainID)
  const web3 = getAnonimWeb3(chain)
  const createContract = createContractFabric(web3, chain.id)
  const dispatch = yield* getDispatchContext()
  const runner = new QueryRunner({ dispatch })
  const axios = getAxios(API_URL)

  yield call(setQueryContext, {
    chainID: chain.id,
    web3,
    createContract,
    axios,
    runQuery: runner.runQuery,
  })
  yield call(setQueryCacheContext, {
    runner,
  })
}

export function* changeContext() {
  const chainID = getNetworkChainID()
  const chain = getChain(chainID)
  const { provider, account, connectorConfig } = yield* getQueryContext()
  const web3 = new Web3(provider)
  const createContract = createContractFabric(web3, chain.id)
  const dispatch = yield* getDispatchContext()
  const runner = new QueryRunner({ dispatch })
  const axios = getAxios(API_URL)

  yield call(setQueryContext, {
    chainID: chain.id,
    createContract,
    axios,
    web3,
    runQuery: runner.runQuery,
  })
  yield call(setQueryCacheContext, {
    runner,
  })
  yield* put(
    actionConnectSuccess.createAction({
      chainID,
      account,
      web3,
      connectorConfig,
    }),
  )
}

export function* anonim() {
  try {
    yield put(actionContextInit.createAction())
    yield call(initAnonimContext)

    const { chainID, web3 } = yield* call(getQueryContext)

    yield put(actionConnectLoading.createAction())

    yield put(
      actionConnectSuccess.createAction({
        chainID,
        web3,
      }),
    )
    yield put(actionContextReady.createAction())
  } catch (error) {
    yield put(
      actionConnectError.createAction({
        error: new ErrorCode(ErrorCode.CODE_ERROR.unknown, error),
      }),
    )
  }
}

export function* init() {
  yield delay(0)

  const chainID = getNetworkChainID()
  const chain = getChain(chainID)
  const connectorConfig = getConnector(chainID)

  if (connectorConfig && !BLACK_LIST_SWITCH_CONNECTORS.includes(connectorConfig.type)) {
    return yield* put(
      actionConnect.createAction({
        connectorConfig,
        chain,
      }),
    )
  }

  yield call(resetConnectorName)
  yield call(anonim)
}

export function* replaceQueryContext() {
  const context = yield* call(getQueryContext)

  if (!context.chainID) throw new ErrorCode(ErrorCode.CODE_ERROR.context.notInit)
}

export function* chainChangedWatch() {
  while (true) {
    const {
      payload: { chainID },
    }: Action<string, ChainChangedPayload> = yield take([actionChainChanged.type])

    const newConnectorConfig = getConnector(chainID)

    if (newConnectorConfig && SUPPORT_CHAINS_IDS.includes(chainID)) {
      setNetworkChainID(chainID)

      yield call(changeContext)

      yield put(actionContextReady.createAction())
    } else {
      setNetworkChainID(SUPPORT_CHAINS_IDS[0])

      yield put(actionDisconnect.createAction())
    }
  }
}

export function* chainToChangeWatch() {
  while (true) {
    const {
      payload: { chain },
    }: Action<string, ChainToChangePayload> = yield take([actionChainToChange.type])

    const { provider } = yield* getQueryContext()
    const newConnectorConfig = getConnector(chain.id)

    if (newConnectorConfig && SUPPORT_CHAINS_IDS.includes(chain.id)) {
      try {
        yield call(switchNetwork, chain, provider)
      } catch (error: any) {
        yield put(actionChainChangedError.createAction({ error }))
      }
    } else {
      yield put(
        actionChainChangedError.createAction({
          error: new ErrorCode(ErrorCode.CODE_ERROR.network.change, { newConnectorConfig }),
        }),
      )
    }
  }
}

export function* accountChangeWatch() {
  while (true) {
    yield take([actionAccountsChanged.type])
    yield put(actionDisconnect.createAction())
  }
}

export function* connectStateWatch() {
  while (true) {
    yield take([actionConnectState.type])
    const { chainID, account, web3, connectorConfig } = yield* getQueryContext()

    if (chainID)
      yield* put(
        actionConnectSuccess.createAction({
          chainID,
          account,
          web3,
          connectorConfig,
        }),
      )
  }
}

export function* accountDisconnectedWatch() {
  while (true) {
    yield take([actionDisconnected.type])
    yield put(actionDisconnect.createAction())
  }
}

export function* resetContexts() {
  yield call(resetQueryContext)
  yield call(resetQueryCacheContext)
}

export function* connect() {
  yield fork(chainChangedWatch)
  yield fork(chainToChangeWatch)
  yield fork(accountChangeWatch)
  yield fork(connectStateWatch)
  yield fork(accountDisconnectedWatch)

  try {
    while (true) {
      const {
        payload: { connectorConfig, chain },
      }: Action<string, LoginPayload> = yield take(actionConnect.type)
      const task = yield* fork(connectWallet, chain, connectorConfig)
      const { type }: Action = yield* take([actionConnectError.type, actionDisconnect.type])

      yield cancel(task)

      if (type === actionDisconnect.type) {
        const { connector } = yield* call(getQueryContext)
        yield call(() => connector?.disconnect())
        yield call(resetConnectorName)
        yield call(resetContexts)
      }

      yield call(anonim)
    }
  } catch (error) {
    yield put(
      actionConnectError.createAction({
        error: new ErrorCode(ErrorCode.CODE_ERROR.unknown, error),
      }),
    )
  }
}
