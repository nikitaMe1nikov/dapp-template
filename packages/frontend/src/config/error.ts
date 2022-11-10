import { IS_DEV } from '@nimel/sdk/'

export const CODE_ERROR = {
  unknown: '0',
  user: {
    notEnoughBalance: '3.1',
    notExist: '3.2',
  },
}

export const CODE_ERROR_MESSAGE = {
  '0': 'unknown error',
  [CODE_ERROR.user.notEnoughBalance]: 'not enough token balance',
  [CODE_ERROR.user.notExist]: 'user does not exist',
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
