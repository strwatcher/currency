import { combineUrl } from "./combine-url";

import { createJsonQuery, declareParams } from "@farfetched/core";
import {zodContract} from '@farfetched/zod'
import {z} from 'zod'

export const ExchangeSymbolsContract = z.record(z.string())
export type ExchangeSymbols = z.infer<typeof ExchangeSymbolsContract> 

export const GetExchangeSymbolsResponse = z.object(
    {
    success: z.boolean(),
    symbols: ExchangeSymbolsContract
    }
)

export const getExchangeSymbolsQuery = createJsonQuery({
    params: declareParams(),
    request: {
        method: 'GET',
        url: combineUrl('symbols'),
    },
    response: {
        contract: zodContract(GetExchangeSymbolsResponse)
    }
})