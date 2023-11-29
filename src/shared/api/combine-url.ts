export function combineUrl(resource: string, qs?: string) {
  return `${import.meta.env.VITE_EXCHANGE_BASE}/${resource}?access_key=${
    import.meta.env.VITE_EXCHANGE_API_KEY
  }&${qs ?? ''}`
}
