import { QueryArg } from '@nimel/sdk/sagas'
import web3Utils from 'web3-utils'

export async function getBlockNumber({ ctx: { web3 } }: QueryArg) {
  return web3.eth.getBlockNumber()
}

export async function sendToken({
  ctx: { web3, account },
  variables: { to, amount },
}: QueryArg<{ to: `0x${string}`; amount: string }>) {
  return web3.eth.sendTransaction({ to, value: web3Utils.toWei(amount), from: account })
}
