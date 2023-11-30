import {
  $source,
  $target,
  sourceChanged,
  targetChanged,
} from '@/entities/currencies'
import {
  $ratioError,
  ConvertedSumLabel,
  ConvertingSumInput,
  ExchangeError,
  UnitConversion,
} from '@/entities/exchange'
import { CurrenciesSwitcher } from '@/features/currencies/switch'
import { getCurrenciesQuery } from '@/shared/api/exchange'
import { Show } from '@/shared/lib/show'
import { Group } from '@/shared/ui/group'
import { Select } from '@/shared/ui/select'
import { Stack } from '@/shared/ui/stack'
import { useUnit } from 'effector-react'

import s from './converter.module.scss'
import { Section } from '@/shared/ui/section'

export const Converter = () => {
  const currencies = useUnit(getCurrenciesQuery.$data)
  const { source, target, onSourceChange, onTargetChanged } = useUnit({
    source: $source,
    target: $target,
    onSourceChange: sourceChanged,
    onTargetChanged: targetChanged,
  })

  const isExchangeError = useUnit($ratioError)
  return (
    <Section
      title="Конвертер валют"
      opened={true}
      classes={{ root: s['straight-root'] }}
    >
      <Stack classes={{ root: s['straight-stack'] }}>
        <Group classes={{ root: s['straight-block'] }}>
          <Select
            label="Исходная валюта"
            value={source}
            onChange={onSourceChange}
            data={currencies ?? []}
            classes={{ root: s['straight-input'] }}
          />

          <CurrenciesSwitcher />

          <Select
            label="Целевая валюта"
            value={target}
            onChange={onTargetChanged}
            data={currencies ?? []}
            classes={{ root: s['straight-input'] }}
          />
        </Group>
        <Group classes={{ root: s['straight-block'] }}>
          <ConvertingSumInput classes={{ root: s['straight-input'] }} />
          <Show when={!isExchangeError} fallback={<ExchangeError />}>
            <Stack classes={{ root: s['straight-element'] }}>
              <UnitConversion />
              <ConvertedSumLabel />
            </Stack>
          </Show>
        </Group>
      </Stack>
    </Section>
  )
}
