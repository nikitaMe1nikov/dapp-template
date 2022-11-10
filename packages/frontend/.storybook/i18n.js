// eslint-disable-next-line import/no-extraneous-dependencies
import i18n from 'i18next'
// eslint-disable-next-line import/no-extraneous-dependencies
import { initReactI18next } from 'react-i18next'

void i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
})
// eslint-disable-next-line import/no-extraneous-dependencies
export { default } from 'i18next'
