import Web3 from 'web3'
import web3Utils from 'web3-utils'
import { AbiItem } from '@nimel/sdk/types'
import { Chain } from '@nimel/sdk/config/network'
import { Contract } from '@nimel/sdk/types'
import { ContractSpec } from '@nimel/sdk/config/contracts'
import { ZERO_ADDRESS } from '@nimel/sdk/config/network'
import Axios from 'axios'
import { addMock } from '@nimel/sdk/queries/mocks/axiosMock'
import { setupCache } from 'axios-cache-interceptor'

export function getAnonimWeb3(chain: Chain) {
  const httpProvider = new Web3.providers.HttpProvider(chain.rpcUrls.default, {
    timeout: 10_000,
  })

  return new Web3(httpProvider)
}

export const USER_REJECT_ERROR = 'User rejected the request'

export function chainToWalletData({ id, name, nativeCurrency, rpcUrls, blockExplorers }: Chain) {
  return {
    chainId: web3Utils.numberToHex(id),
    chainName: name,
    nativeCurrency,
    rpcUrls: [rpcUrls.default],
    blockExplorerUrls: [blockExplorers?.default.url],
  }
}

export async function switchNetwork(chain: Chain, provider = window.ethereum): Promise<void> {
  if (provider) {
    const walletChain = chainToWalletData(chain)

    try {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: walletChain.chainId }],
        })
      } catch (error: any) {
        if (!error.message.includes(USER_REJECT_ERROR)) {
          await (provider as any).request({
            method: 'wallet_addEthereumChain',
            params: [walletChain],
          })

          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: walletChain.chainId }],
          })
        }
      }
    } catch (error: any) {
      if (error.message.includes(USER_REJECT_ERROR) || error?.code === 4001) {
        throw error
      }

      console.error(error)
    }
  }
}

export type ContractConfig = {
  abi: AbiItem
  addressByChains: Record<string, string>
}

export function createContractFabric(web3: Web3, chainID: number) {
  const cache = new Map<AbiItem, Map<string, Contract>>()

  return function createContract<CS extends ContractSpec>(
    { abi, addressByChains }: CS,
    overrideChainID = chainID,
  ): CS['web3types'] {
    const address = (addressByChains as Record<number, string>)[overrideChainID] || ZERO_ADDRESS
    const contract = cache.get(abi)?.get(address)

    if (contract) return contract

    const newContract = new web3.eth.Contract(abi as any, address)

    if (cache.has(abi)) {
      cache.get(abi)?.set(address, newContract)
    } else {
      cache.set(abi, new Map([[address, newContract]]))
    }

    return newContract
  }
}

export function delay<R, F extends () => R = () => R>(timeout: number, func?: F) {
  return new Promise<typeof func extends undefined ? undefined : R>(resolve =>
    setTimeout(() => resolve(func && (func() as any)), timeout),
  )
}

export type Key = (string | number | Record<string, string | number> | any)[]
export type UniqKey = string

export function createUniqKey(key: Key): UniqKey {
  return JSON.stringify(key)
}

export function getAxios(apiUrl: string) {
  const axios = Axios.create({ baseURL: apiUrl })

  if (process.env.MOCK === 'true') {
    addMock(axios)
  } else {
    setupCache(axios, { ttl: 2000 })
  }

  return axios
}
