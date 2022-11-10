import 'next-i18next'
declare module 'next-i18next' {
  export interface Resources {
    common: typeof import('./public/locales/en/common.json')
  }
}
