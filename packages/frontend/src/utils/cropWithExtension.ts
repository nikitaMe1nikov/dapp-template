export function cropWithExtension(value: string, maxChars = 0, trailingCharCount = 3) {
  if (value.length > maxChars) {
    const front = value.slice(0, Math.min(value.length, maxChars - trailingCharCount - 3))
    const mid = '...'
    const end = value.slice(-trailingCharCount)

    return front + mid + end
  }

  return value
}
