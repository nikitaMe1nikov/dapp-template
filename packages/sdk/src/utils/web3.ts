import BN from 'bignumber.js'

export const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
const BIG_TEN = new BN(10)

export function weiToString(wei: string | number, decimals: string | number = '0', fixed?: number) {
  if (+decimals < 0) return wei

  const weiByDecimals = new BN(wei).dividedBy(BIG_TEN.pow(decimals))

  if (fixed) return weiByDecimals.decimalPlaces(fixed, 1).toString(10)

  return weiByDecimals.toString(10)
}

export function weiToNumber(wei: string | number, decimals: string | number = '0', fixed?: number) {
  return +weiToString(wei, decimals, fixed)
}

export function stringToWei(wei: string | number, decimals: string | number = '0') {
  return +decimals < 0 ? wei : new BN(wei).multipliedBy(BIG_TEN.pow(decimals)).toString(10)
}
