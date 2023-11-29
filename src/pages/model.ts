import { sample } from "effector";
import {appStarted} from '@/shared/config'
import { getExchangeSymbolsQuery } from "@/shared/api/exchange";

sample({
    clock: appStarted,
    target: getExchangeSymbolsQuery.start
})

getExchangeSymbolsQuery.finished.success.watch(console.log)