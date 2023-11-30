export function combineUrl(resource: string) {
  return `${import.meta.env.VITE_EXCHANGE_BASE}/${resource}.json`
}
