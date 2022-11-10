import { ContractSpec, CONTRACT_SPECS } from '@nimel/sdk/config/contracts'
import { MAINNET_BSC_CHAIN_ID } from './network'

export type TokenSpec = {
  symbol: string
  contract: ContractSpec
  decimals: number
  projectLink: string
  logo: any
}

export const TOKEN_SPECS = {
  bnb: {
    symbol: 'BNB',
    projectLink: 'https://www.binance.com/',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      [MAINNET_BSC_CHAIN_ID]: '0x55d398326f99059ff775485246999027b3197955',
    },
    decimals: 18,
    projectLink: 'https://tether.to/',
    logoUrl: '',
  },
  busd: {
    symbol: 'BUSD',
    contract: CONTRACT_SPECS.busd,
    decimals: 18,
    projectLink: 'https://tether.to/',
    logoUrl: '',
  },
} as const
