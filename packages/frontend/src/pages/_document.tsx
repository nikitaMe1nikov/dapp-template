import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { Children } from 'react'
import createEmotionServer from '@emotion/server/create-instance'
import { createEmotionCache } from 'utils/createEmotionCache'
import i18nextConfig from '../../next-i18next.config'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => props => <App emotionCache={cache} {...props} />,
      })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

    return {
      ...initialProps,
      styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
    }
  }

  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale

    return (
      <Html lang={currentLocale}>
        <Head>
          <link rel='icon' type='image/png' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
