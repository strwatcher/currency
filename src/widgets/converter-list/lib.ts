export const currencyUnits = [1, 5, 10, 25, 50, 100, 500, 1000, 5000]

export function convertUnit(amount: number, ratio: number) {
  return amount * ratio
}
