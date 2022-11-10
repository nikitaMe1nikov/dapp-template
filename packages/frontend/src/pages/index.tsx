import { FC } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import nextI18NextConfig from '../../next-i18next.config.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const MainPage: FC = () => (
  <>
    <Head>
      <title>LOBBY</title>
    </Head>
    <h1>Index</h1>
  </>
)

export default MainPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'], nextI18NextConfig)),
  },
})
