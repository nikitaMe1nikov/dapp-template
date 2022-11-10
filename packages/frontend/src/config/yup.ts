import * as Yup from 'yup'
import web3 from 'web3'
import { StringSchema as TStringSchema } from 'yup'

declare module 'yup' {
  interface StringSchema {
    isWeb3Address(message?: string): TStringSchema
    latin(message?: string): TStringSchema
    notStartNumber(message?: string): TStringSchema
  }
}

Yup.addMethod(Yup.string, 'isWeb3Address', function (message = 'Address wrong') {
  return this.test('test-is-web3-address', message, function (value) {
    const { path, createError } = this

    if (!value) return true

    return (
      web3.utils.isAddress(value) ||
      createError({
        path,
        message,
      })
    )
  })
})

const LATIN_REGXP = /^([\d\sA-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]*)$/

Yup.addMethod(Yup.string, 'latin', function (message = 'only latin words') {
  return this.test('test-latin', message, function (value) {
    const { path, createError } = this

    if (!value) return true

    return (
      LATIN_REGXP.test(value) ||
      createError({
        path,
        message,
      })
    )
  })
})

const NUMBER_START_REGXP = /^\d/

Yup.addMethod(Yup.string, 'notStartNumber', function (message = `can't start with a number`) {
  return this.test('test-not-start-number', message, function (value) {
    const { path, createError } = this

    if (!value) return true

    return (
      !NUMBER_START_REGXP.test(value) ||
      createError({
        path,
        message,
      })
    )
  })
})
