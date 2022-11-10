export type CacheKey = (string | number | Record<string, string | number>)[]
export type CacheValue = {
  value: unknown
  timestamp: number
  ttl: number
}

export const DEFAULT_TTL = 1000

export class QueryCache {
  ttl = DEFAULT_TTL

  constructor(initCache: [string, CacheValue][] = [], ttl = DEFAULT_TTL) {
    const now = Date.now()
    this.ttl = ttl
    const timestamped = initCache.map<[string, CacheValue]>(([key, value]) => [
      key,
      { ...value, timestamp: now, ttl },
    ])
    this.cache = new Map<string, CacheValue>(timestamped)
  }

  cache: Map<string, CacheValue>

  has(cacheKey: CacheKey) {
    const key = this.stringify(cacheKey)

    return this.isStale(key) ? false : this.cache.has(key)
  }

  set(cacheKey: CacheKey, value: any, ttl = this.ttl) {
    return this.cache.set(this.stringify(cacheKey), { value, timestamp: Date.now(), ttl })
  }

  get(cacheKey: CacheKey) {
    const key = this.stringify(cacheKey)

    if (this.isStale(key)) {
      this.cache.delete(key)

      return
    }

    return this.cache.get(key)?.value
  }

  isStale(key: string) {
    if (this.cache.has(key)) {
      const cacheValue = this.cache.get(key)

      if (cacheValue && cacheValue.ttl && Date.now() - cacheValue.timestamp > cacheValue.ttl) {
        return true
      }
    }

    return false
  }

  stringify(key: CacheKey) {
    return JSON.stringify(key)
  }

  dehydrate() {
    return [...this.cache]
  }
}
