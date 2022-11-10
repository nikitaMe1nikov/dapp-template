import { observable, computed, makeObservable } from 'mobx'
import {
  actionConnect,
  effectConnectError,
  effectConnectSuccess,
  LoginSuccessPayload,
  actionDisconnect,
  effectDisconnect,
  LoginPayload,
  ErrorPayload,
  effectConnectLoading,
  actionChainToChange,
  actionConnectState,
} from '@nimel/sdk/sagas'
import type { Web3 } from '@nimel/sdk/types'
import type { ConnectorConfig } from '@nimel/sdk/config/wallet'
import { QueryStore } from './QueryStore'
import { ErrorCode } from '@nimel/sdk/config/error'
import { Chain } from 'wagmi'
import { whenInit } from '@nimel/directorr'

export class User {
  account: string

  constructor(account: string) {
    this.account = account
  }
}

export class AuthStore extends QueryStore {
  constructor() {
    super()
    makeObservable(this)
  }

  @observable chainID?: number

  @observable.ref web3?: Web3

  @observable.ref error?: ErrorCode

  @observable.ref connectorConfig?: ConnectorConfig

  @computed
  get isLogin() {
    return !!this.user
  }

  @computed
  get isReady() {
    return !!this.chainID && !!this.web3 && !!this.connectorConfig
  }

  @observable user?: User

  @observable isLoading = true

  @whenInit
  @actionConnectState
  init = () => {}

  @actionConnect
  login = (chain: LoginPayload['chain'], connectorConfig: LoginPayload['connectorConfig']) => ({
    connectorConfig,
    chain,
  })

  @effectConnectLoading
  toLoading = () => {
    this.isLoading = true
  }

  @effectConnectSuccess
  @effectConnectError
  toEndLoading = () => {
    this.isLoading = false
  }

  @effectConnectSuccess
  whenLoginSuccess = ({ account, chainID, web3, connectorConfig }: LoginSuccessPayload) => {
    this.chainID = chainID
    this.web3 = web3

    if (account) {
      this.user = new User(account)
      this.connectorConfig = connectorConfig
    }
  }

  @effectConnectError
  whenLoginError = ({ error }: ErrorPayload) => {
    this.error = error
  }

  @actionDisconnect
  logout = () => {}

  @effectDisconnect
  toLogout = () => {
    this.user = undefined
    this.chainID = undefined
    this.web3 = undefined
    this.connectorConfig = undefined
  }

  @actionChainToChange
  changeChain = (chain: Chain) => ({ chain })
}
