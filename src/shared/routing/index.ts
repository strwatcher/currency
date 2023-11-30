import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from 'atomic-router'
import { sample } from 'effector'
import { createBrowserHistory } from 'history'
import { appStarted } from '../config'

export const routes = {
  exchange: createRoute(),
  notFound: createRoute(),
}

export const controls = createRouterControls()

export const router = createHistoryRouter({
  routes: [{ path: '/exchange', route: routes.exchange }],
  notFoundRoute: routes.notFound,
  controls,
})

sample({
  clock: routes.notFound.opened,
  target: routes.exchange.open,
})

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
