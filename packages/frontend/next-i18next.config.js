const path = require('path')
const localePath = path.resolve('./public/locales')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: isDev,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
  localePath,
  reloadOnPrerender: isDev,
}
