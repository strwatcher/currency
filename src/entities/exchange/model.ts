import { getExchangeRatesQuery } from '@/shared/api/exchange'
import { createEvent, createStore, sample } from 'effector'

export const $convertingSum = createStore<number | null>(null)
export const convertingSumChanged = createEvent<number>()
export const $convertedSum = createStore(0)

export const $ratio = getExchangeRatesQuery.$data
export const $ratioError = getExchangeRatesQuery.$error

sample({ clock: convertingSumChanged, target: $convertingSum })

sample({
  clock: [convertingSumChanged, $ratio],
  source: { source: $convertingSum, ratio: $ratio },
  fn: ({ source, ratio }) => {
    if (typeof ratio !== 'number' || typeof source !== 'number') return 0
    return ratio * source
  },
  target: $convertedSum,
})
