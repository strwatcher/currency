export function combineUrl(resource: string, qs?: string) {
  return `${import.meta.env.VITE_EXCHANGE_BASE}/${resource}?apikey=${
    import.meta.env.VITE_EXCHANGE_API_KEY
  }&${qs ?? ''}`
}
