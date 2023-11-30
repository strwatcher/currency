import { controls } from '@/shared/routing'
import { querySync } from 'atomic-router'
import { createEvent, createStore, sample } from 'effector'

export const $source = createStore('')
export const $target = createStore('')

export const sourceChanged = createEvent<string>()
export const targetChanged = createEvent<string>()

sample({
  clock: sourceChanged,
  target: $source,
})

sample({
  clock: targetChanged,
  target: $target,
})

export const sourceTargetChanged = [sourceChanged, targetChanged]

querySync({
  source: { source: $source, target: $target },
  controls,
})
