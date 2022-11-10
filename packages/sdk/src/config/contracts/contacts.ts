import {
  MAINNET_BSC_CHAIN_ID,
  TESTNET_BSC_CHAIN_ID,
  MAINNET_AVAX_CHAIN_ID,
  TESTNET_AVAX_CHAIN_ID,
} from '@nimel/sdk/config/network'
import erc20AbiJson from '@nimel/sdk/config/contracts/abi/erc20Abi.json'
import oneInchSpotAbiJson from '@nimel/sdk/config/contracts/abi/oneInchSpotAbi.json'
import { ChainNames } from '@nimel/sdk/config/network'
import { AbiItem } from '@nimel/sdk/types/web3'
import { BaseContract } from '@nimel/sdk/types/contracts/types'
import { Erc20Abi, OneInchSpotAbi } from '@nimel/sdk/types'
// import { ZERO_ADDRESS } from '@nimel/sdk/config/network'

export type ContractSpec<T = string> = {
  abi: AbiItem
  addressByChains: {
    [prop in ChainNames]?: T
  }
  web3types: BaseContract
}

export const CONTRACT_SPECS = {
  oneInchSpotPriceAggregator: {
    abi: oneInchSpotAbiJson,
    addressByChains: {
      [TESTNET_BSC_CHAIN_ID]: '',
      [MAINNET_BSC_CHAIN_ID]: '0xfbD61B037C325b959c0F6A7e69D8f37770C2c550',
      [TESTNET_AVAX_CHAIN_ID]: '',
      [MAINNET_AVAX_CHAIN_ID]: '0xBd0c7AaF0bF082712EbE919a9dD94b2d978f79A9',
    },
    web3types: {} as OneInchSpotAbi,
  },
  busd: {
    abi: erc20AbiJson,
    addressByChains: {
      [TESTNET_BSC_CHAIN_ID]: '0x64b07f032A417328b12927d62E34F1E8118139d3',
      [MAINNET_BSC_CHAIN_ID]: '0x64b07f032A417328b12927d62E34F1E8118139d3',
      [TESTNET_AVAX_CHAIN_ID]: '0x64b07f032A417328b12927d62E34F1E8118139d3',
      [MAINNET_AVAX_CHAIN_ID]: '0x64b07f032A417328b12927d62E34F1E8118139d3',
    },
    web3types: {} as Erc20Abi,
  },
} as const
