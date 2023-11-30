import { combineUrl } from './combine-url'

import { createJsonQuery, createQuery, declareParams } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'
import { createEffect } from 'effector'
import { z } from 'zod'
import dayjs from 'dayjs'
import { or } from 'patronum'

export const GetCurrenciesResponseContract = z.record(z.unknown())

export type Currencies = Array<string>
export const getCurrenciesQuery = createJsonQuery({
  params: declareParams(),
  initialData: [],
  request: {
    method: 'GET',
    url: combineUrl('latest/currencies'),
  },
  response: {
    contract: zodContract(GetCurrenciesResponseContract),
    mapData({ result }): Currencies {
      return Object.entries(result).map(([currency]) => currency.toUpperCase())
    },
  },
})

export type GetExchangeRateQueryParams = {
  source: string
  target: string
}

export const GetExchangeRateResponseContract = z.record(
  z.union([z.string(), z.number()])
)

export type GetExchangeRateResponse = z.infer<
  typeof GetExchangeRateResponseContract
>

export const getExchangeRatesQuery = createJsonQuery({
  params: declareParams<GetExchangeRateQueryParams>(),
  initialData: 0,
  request: {
    method: 'GET',
    url: ({ source, target }) =>
      combineUrl(
        `latest/currencies/${source.toLowerCase()}/${target.toLowerCase()}`
      ),
  },
  response: {
    contract: zodContract(GetExchangeRateResponseContract),
    mapData({ result, params }): number {
      return Number(result[params.target.toLowerCase()])
    },
  },
})

export type GetHistoryQueryParams = {
  source: string
  target: string
}

const GetHistoryChunkContract = z.record(z.union([z.string(), z.number()]))

const GetHistoryResponseContract = z.array(GetHistoryChunkContract)

type GetHistoryResponse = z.infer<typeof GetHistoryResponseContract>

export const getHistoryQuery = createQuery({
  effect: createEffect(async ({ source, target }: GetHistoryQueryParams) => {
    const currentDate = dayjs().subtract(1, 'day') // Sorry but free api can't provide more actual data :(

    const dates = Array.from({ length: 10 }, (_, i) => {
      const date = currentDate.subtract(i, 'day')
      return date.format('YYYY-MM-DD')
    }).reverse()

    const responses = await Promise.all(
      dates.map((date) => {
        return fetch(
          combineUrl(
            `${date}/currencies/${source.toLowerCase()}/${target.toLowerCase()}`
          )
        )
      })
    )

    const data = await Promise.all(responses.map((response) => response.json()))
    const parsedData = await GetHistoryResponseContract.parseAsync(data)
    return parsedData
  }),
  validate({ result }) {
    const isValid = !(result as GetHistoryResponse).find(
      ({ date, ...other }) =>
        typeof date !== 'string' ||
        typeof other[Object.keys(other)[0]] !== 'number'
    )

    return isValid
  },
  mapData({ result }) {
    return (result as GetHistoryResponse).map(({ date, ...other }) => ({
      date,
      ratio: other[Object.keys(other)[0]],
    }))
  },
})

export const $loading = or(
  getCurrenciesQuery.$pending,
  getExchangeRatesQuery.$pending,
  getHistoryQuery.$pending
)
