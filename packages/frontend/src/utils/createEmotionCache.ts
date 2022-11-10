import createCache from '@emotion/cache'

export type { EmotionCache } from '@emotion/cache'

export const createEmotionCache = () => createCache({ key: 'css', prepend: true })
