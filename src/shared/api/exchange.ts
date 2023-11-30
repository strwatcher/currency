import { combineUrl } from './combine-url'

import {
  ValidationResult,
  createJsonQuery,
  declareParams,
} from '@farfetched/core'
import { zodContract } from '@farfetched/zod'
import { z } from 'zod'

export const GetCurrenciesResponseContract = z.object({
  data: z.record(z.unknown()),
})

export type Currencies = Array<string>
export const getExchangeSymbolsQuery = createJsonQuery({
  params: declareParams(),
  request: {
    method: 'GET',
    url: combineUrl('currencies'),
  },
  response: {
    contract: zodContract(GetCurrenciesResponseContract),
    mapData({ result }): Currencies {
      return Object.entries(result.data).map(([currency, _]) => currency)
    },
  },
})

export type GetExchangeRateQueryParams = {
  source: string
  target: string
}

export const GetExchangeRateResponseContract = z.object({
  data: z.record(z.number()),
})

export type GetExchangeRateResponse = z.infer<
  typeof GetExchangeRateResponseContract
>

export const getExchangeRatesQuery = createJsonQuery({
  params: declareParams<GetExchangeRateQueryParams>(),
  request: {
    method: 'GET',
    url: ({ source, target }) =>
      combineUrl('latest', `base_currency=${source}&currencies=[${target}]`),
  },
  response: {
    contract: zodContract(GetExchangeRateResponseContract),
    validate({ result, params }): ValidationResult {
      return !!(result as GetExchangeRateResponse).data[params.target]
    },
    mapData({ result, params }) {
      return result.data[params.target]
    },
  },
})
