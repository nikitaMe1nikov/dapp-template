import { Chain } from 'wagmi'
import { getChainFromList } from './chains'
import { IS_DEV } from './env'

export type { Chain } from 'wagmi'

export const BLOCKCHAIN_NETWORK_ID_KEY = 'BLOCKCHAIN_NETWORK_ID'

export const MAINNET_BSC_CHAIN_ID = 56
export const TESTNET_BSC_CHAIN_ID = 97
export const MAINNET_AVAX_CHAIN_ID = 43_114
export const TESTNET_AVAX_CHAIN_ID = 43_113
export const AVALIBLE_CHAIN_IDS = [
  MAINNET_BSC_CHAIN_ID,
  TESTNET_BSC_CHAIN_ID,
  MAINNET_AVAX_CHAIN_ID,
  TESTNET_AVAX_CHAIN_ID,
]
export const SUPPORT_CHAINS_IDS = IS_DEV
  ? [MAINNET_BSC_CHAIN_ID, TESTNET_BSC_CHAIN_ID, MAINNET_AVAX_CHAIN_ID, TESTNET_AVAX_CHAIN_ID]
  : [MAINNET_BSC_CHAIN_ID, MAINNET_AVAX_CHAIN_ID]

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export type ChainNames = number

export function getChain(chainID?: number | string): Chain {
  const { chainId, name, chain, nativeCurrency, rpc, explorers } = getChainFromList(chainID)

  return {
    id: chainId,
    name,
    network: chain,
    nativeCurrency,
    rpcUrls: {
      default: rpc[0],
    },
    blockExplorers: {
      default: explorers[0],
    },
  }
}

export const SUPPORT_CHAINS = SUPPORT_CHAINS_IDS.map(chainID => getChain(chainID))

export function setNetworkChainID(chainID: number) {
  localStorage.setItem(BLOCKCHAIN_NETWORK_ID_KEY, `${chainID}`)

  return chainID
}

export function getNetworkChainID() {
  const chainID = localStorage.getItem(BLOCKCHAIN_NETWORK_ID_KEY)

  if (!chainID || !SUPPORT_CHAINS_IDS.includes(Number.parseInt(chainID) as ChainNames))
    return setNetworkChainID(SUPPORT_CHAINS_IDS[0])

  return Number.parseInt(chainID) as ChainNames
}

export function resetNetworkChainID() {
  localStorage.removeItem(BLOCKCHAIN_NETWORK_ID_KEY)
}
