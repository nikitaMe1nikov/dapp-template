import { createActionAndEffect } from '@nimel/directorr'
import { ErrorCode } from '@nimel/sdk/config/error'
import { Chain } from '@nimel/sdk/config/network'
import { ConnectorConfig } from '@nimel/sdk/config/wallet'
import { Web3 } from '@nimel/sdk/types'

export type ErrorPayload = {
  error: ErrorCode
}

export type LoginPayload = {
  connectorConfig: ConnectorConfig
  chain: Chain
}

export type LoginSuccessPayload = {
  chainID: number
  account?: string
  web3: Web3
  connectorConfig?: ConnectorConfig
}

export const [
  actionConnect,
  effectConnect,
  actionConnectSuccess,
  effectConnectSuccess,
  actionConnectError,
  effectConnectError,
  actionConnectLoading,
  effectConnectLoading,
] = createActionAndEffect<LoginPayload, LoginSuccessPayload, ErrorPayload, void>('CONNECT')

export const [actionConnectState, effectConnectState] = createActionAndEffect<void>('CONNECT_STATE')

export const [actionDisconnect, effectDisconnect] = createActionAndEffect<void>('DISCONNECT')

export type ChainChangedPayload = {
  chainID: number
}

export const [
  actionChainChanged,
  effectChainChanged,
  actionChainChangedSuccess,
  effectChainChangedSuccess,
  actionChainChangedError,
  effectChainChangedError,
] = createActionAndEffect<ChainChangedPayload, ChainChangedPayload, ErrorPayload>('CHAIN_CHANGED')

export type ChainToChangePayload = {
  chain: Chain
}

export const [
  actionChainToChange,
  effectChainToChanged,
  actionChainToChangedSuccess,
  effectChainToChangedSuccess,
  actionChainToChangedError,
  effectChainToChangedError,
] = createActionAndEffect<ChainToChangePayload, ChainToChangePayload, ErrorPayload>(
  'CHAIN_TO_CHANGE',
)

export type AccountsChangedPayload = {
  account: string
}

export const [actionAccountsChanged, effectAccountsChanged] =
  createActionAndEffect<AccountsChangedPayload>('ACCOUNTS_CHANGED')

export type ConnectInfoPayload = {
  chainID: number
}

export const [actionConnected, effectConnected] =
  createActionAndEffect<ConnectInfoPayload>('ACCOUNT_CONNECTED')

export type DisconnectInfo = {
  error: Error
}

export const [actionDisconnected, effectDisconnected] =
  createActionAndEffect<DisconnectInfo>('ACCOUNT_DISCONNECTED')

export type MessageInfoPayload = {
  type: string
}

export const [actionMessage, effectMessage] =
  createActionAndEffect<MessageInfoPayload>('ACCOUNT_MESSAGE')

export const [actionContextReady, effectContextReady] = createActionAndEffect<void>('CONTEXT_READY')

export const [actionContextInit, effectContextInit] = createActionAndEffect<void>('CONTEXT_INIT')
