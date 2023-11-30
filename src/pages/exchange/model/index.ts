import { createEvent, sample } from 'effector'
import {
  getCurrenciesQuery,
  getExchangeRatesQuery,
  getHistoryQuery,
} from '@/shared/api/exchange'
import { routes } from '@/shared/routing'
import { RouteParamsAndQuery, chainRoute } from 'atomic-router'
import { combineEvents, spread } from 'patronum'
import {
  $source,
  $target,
  sourceChanged,
  sourceTargetChanged,
  targetChanged,
} from '@/entities/currencies'

const beforeCurrenciesPrefetchedOpen =
  createEvent<RouteParamsAndQuery<Record<string, never>>>()

sample({
  clock: beforeCurrenciesPrefetchedOpen,
  target: getCurrenciesQuery.start,
})

export const currenciesPrefetchedRoute = chainRoute({
  route: routes.exchange,
  beforeOpen: beforeCurrenciesPrefetchedOpen,
  openOn: getCurrenciesQuery.finished.success,
  cancelOn: getCurrenciesQuery.finished.failure,
})

const beforeOpen = createEvent<RouteParamsAndQuery<Record<string, never>>>()

sample({
  clock: beforeOpen,
  source: {
    source: $source,
    target: $target,
    currencies: getCurrenciesQuery.$data,
  },
  fn: ({ source, target, currencies }) => {
    if (!currencies.includes(source) || !currencies.includes(target)) {
      return {
        source: currencies[0],
        target: currencies[1],
      }
    }
    return { source, target }
  },
  target: spread({
    targets: {
      source: sourceChanged,
      target: targetChanged,
    },
  }),
})

sample({
  clock: sourceTargetChanged,
  source: { source: $source, target: $target },
  target: [getHistoryQuery.start, getExchangeRatesQuery.start],
})

const cancelOn = [
  getHistoryQuery.finished.failure,
  getExchangeRatesQuery.finished.failure,
]

const openOn = combineEvents({
  events: {
    getHistory: getHistoryQuery.finished.success,
    getExchangeRates: getExchangeRatesQuery.finished.success,
  },
})

export const route = chainRoute({
  route: currenciesPrefetchedRoute,
  beforeOpen,
  cancelOn,
  openOn,
})
