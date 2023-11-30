import { $source, $target } from '@/entities/currencies'
import { createEvent, sample } from 'effector'
import { useUnit } from 'effector-react'
import { spread } from 'patronum'

export const switchSourceAndTarget = createEvent()

sample({
  clock: switchSourceAndTarget,
  source: { source: $source, target: $target },
  target: spread({
    targets: {
      source: $target,
      target: $source,
    },
  }),
})

export function useSwitchSourceAndTarget() {
  return useUnit(switchSourceAndTarget)
}
