import { Link } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales?.filter(locale => locale !== activeLocale)

  return (
    <div>
      {otherLocales?.map(locale => {
        const { pathname, query, asPath } = router

        return (
          <NextLink href={{ pathname, query }} as={asPath} locale={locale} key={locale}>
            <Link>{locale}</Link>
          </NextLink>
        )
      })}
    </div>
  )
}
