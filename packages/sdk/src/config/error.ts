import { IS_DEV } from './env'

export const DEFAULT_ERROR_MESSAGE = 'unknown error'

export const CODE_ERROR = {
  unknown: '0',
  network: {
    disconnected: '0.1',
    connected: '0.2',
    change: '0.3',
  },
  connect: {
    notFoundProvider: '1.1',
    userReject: '1.2',
    unknown: '1.3',
    noAccount: '1.4',
  },
  context: {
    notInit: '2.1',
  },
}

export const CODE_ERROR_MESSAGE = {
  '0': 'unknown error',
  [CODE_ERROR.network.disconnected]: 'network disconnected',
  [CODE_ERROR.network.connected]: 'network connected',
  [CODE_ERROR.network.change]: 'network changed',
  [CODE_ERROR.connect.notFoundProvider]: 'not found provider',
  [CODE_ERROR.connect.userReject]: 'user reject',
  [CODE_ERROR.connect.noAccount]: 'not connect wallet',
  [CODE_ERROR.context.notInit]: 'context no init',
}

export class ErrorCode extends Error {
  static CODE_ERROR = CODE_ERROR

  result: any

  code: string

  constructor(code = CODE_ERROR.unknown, result: any = {}) {
    super(
      `${IS_DEV ? `${code}: ` : ''}${CODE_ERROR_MESSAGE[code] || CODE_ERROR_MESSAGE['0']} ${
        result?.reason ? `with reason ${result?.reason}` : ''
      }`,
    )
    this.name = this.constructor.name
    this.result = result
    this.code = code
  }
}
