import chainsList from './chainslist.json'

export type ChainFronList = typeof chainsList[number]

export const UNKNOWN_NETWORK: ChainFronList = {
  name: 'Unknown Network',
  chainId: 0,
  shortName: 'unknown',
  networkId: 1,
  nativeCurrency: { name: 'unknown', symbol: 'UNKNOWN', decimals: 18 },
  rpc: [],
  faucets: [],
  infoURL: '',
  chain: 'UNKNOWN',
  explorers: [{ name: 'UNKNOWN', url: '', standard: 'UNKNOWN' }],
}

export function getChainFromList(chainID?: string | number) {
  return chainID
    ? Object.assign(
        {},
        UNKNOWN_NETWORK,
        chainsList.find(({ chainId }) => chainId === +chainID),
      )
    : UNKNOWN_NETWORK
}
