import web3 from 'web3'

export * from 'web3'

export type Contract = InstanceType<web3['eth']['Contract']>
export type Web3 = web3

export type AbiItem = Record<string, any>[]
