import { createRoutesView } from 'atomic-router-react'
import { ExchangeRoute } from './exchange'

export const Pages = createRoutesView({
  routes: [ExchangeRoute],
})
