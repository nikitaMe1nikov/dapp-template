export const copyToClipboard = (copyText?: string) => {
  if (navigator.clipboard && copyText) {
    void navigator.clipboard.writeText(copyText)
  }
}
