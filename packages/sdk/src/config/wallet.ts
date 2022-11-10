// import { BscConnector } from '@binance-chain/bsc-connector'
import { Chain } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {
  TESTNET_BSC_CHAIN_ID,
  MAINNET_BSC_CHAIN_ID,
  MAINNET_AVAX_CHAIN_ID,
  TESTNET_AVAX_CHAIN_ID,
} from '@nimel/sdk/config/network'

export const CONNECTOR_ID_KEY = 'CONNECTOR_ID_KEY'
export const DEFAULT_CONNECTOR: ConnectorNames = 'metamask'

export function createInjectedConnector(chain: Chain) {
  return new InjectedConnector({ chains: [chain], options: { shimDisconnect: false } })
}

export function createMetamaskConnector(chain: Chain) {
  return new MetaMaskConnector({ chains: [chain], options: { shimDisconnect: false } })
}

export function createWalletConnectConnector(chain: Chain) {
  return new WalletConnectConnector({
    chains: [chain],
    options: {
      rpc: { [chain.id]: chain.rpcUrls.default },
      bridge: 'https://p.bridge.walletconnect.org',
      qrcode: true,
      qrcodeModalOptions: {
        mobileLinks: ['metamask', 'trust'],
      },
    },
  })
}

export function createCoinbaseWalletConnector(chain: Chain) {
  return new CoinbaseWalletConnector({
    chains: [chain],
    options: {
      appName: 'DApp Template',
    },
  })
}

export type ConnectorNames = typeof CONNECTORS_CONFS[number]

export type ConnectorConfig = typeof connectorsBSC[number] | typeof connectorsAvax[number]

export type Connector = ReturnType<ConnectorConfig['createConnector']>

export const connectorsBSC = [
  {
    type: 'metamask',
    title: 'Metamask',
    createConnector: createMetamaskConnector,
  },
  {
    type: 'coinbase',
    title: 'Coinbase Wallet',
    createConnector: createCoinbaseWalletConnector,
  },
  {
    type: 'coin98',
    title: 'Coin98',
    createConnector: createInjectedConnector,
  },
  {
    type: 'trustWallet',
    title: 'Trust Wallet',
    createConnector: createInjectedConnector,
  },
  {
    type: 'tokenPocket',
    title: 'Token Pocket',
    createConnector: createInjectedConnector,
  },
  {
    type: 'walletConnect',
    title: 'Wallet Connect',
    createConnector: createWalletConnectConnector,
  },
  // {
  //   type: 'binance',
  //   title: 'Binance Chain Wallet',
  //   createConnector: createBscConnector,
  // },
  {
    type: 'safePal',
    title: 'SafePal Wallet',
    createConnector: createInjectedConnector,
  },
]

export const connectorsAvax = [
  {
    type: 'metamask',
    title: 'Metamask',
    createConnector: createMetamaskConnector,
  },
  {
    type: 'coinbase',
    title: 'Coinbase Wallet',
    createConnector: createCoinbaseWalletConnector,
  },
  {
    type: 'coin98',
    title: 'Coin98',
    createConnector: createInjectedConnector,
  },
  {
    type: 'trustWallet',
    title: 'Trust Wallet',
    createConnector: createInjectedConnector,
  },
  {
    type: 'tokenPocket',
    title: 'Token Pocket',
    createConnector: createInjectedConnector,
  },
  {
    type: 'walletConnect',
    title: 'Wallet Connect',
    createConnector: createWalletConnectConnector,
  },
  {
    type: 'safePal',
    title: 'SafePal Wallet',
    createConnector: createInjectedConnector,
  },
]

export const CONNECTORS_CONF_BY_CHAIN: Record<string, ConnectorConfig[]> = {
  [MAINNET_BSC_CHAIN_ID]: connectorsBSC,
  [TESTNET_BSC_CHAIN_ID]: connectorsBSC,
  [MAINNET_AVAX_CHAIN_ID]: connectorsAvax,
  [TESTNET_AVAX_CHAIN_ID]: connectorsAvax,
}

export const CONNECTORS_CONFS = [
  ...connectorsBSC.map(c => c.type),
  ...connectorsAvax.map(c => c.type),
]

export function getConnectors(chainID: number): ConnectorConfig[] {
  return CONNECTORS_CONF_BY_CHAIN[chainID]
}

export function setConnectorName(connectorName: ConnectorNames) {
  localStorage.setItem(CONNECTOR_ID_KEY, connectorName)

  return connectorName
}

export function resetConnectorName() {
  localStorage.removeItem(CONNECTOR_ID_KEY)
}

export function getConnectorName() {
  const connectorName = localStorage.getItem(CONNECTOR_ID_KEY)

  if (connectorName)
    return CONNECTORS_CONFS.includes(connectorName as ConnectorNames)
      ? (connectorName as ConnectorNames)
      : setConnectorName(DEFAULT_CONNECTOR)
}

export function getConnector(chainID: number) {
  const connectorName = getConnectorName()
  const connectorConfs = getConnectors(chainID)

  return connectorConfs?.find(c => c.type === connectorName)
}
