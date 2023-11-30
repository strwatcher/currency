export function formatCurrency(currency: number) {
  return currency.toLocaleString('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
}
