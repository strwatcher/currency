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

export const ExchangePage = () => {
  const currencies = useUnit(getCurrenciesQuery.$data)
  const { source, target, onSourceChange, onTargetChanged } = useUnit({
    source: $source,
    target: $target,
    onSourceChange: sourceChanged,
    onTargetChanged: targetChanged,
  })

  const isExchangeError = useUnit($ratioError)
  return (
    <Stack>
      <Group>
        <ConvertingSumInput />
        <Show when={!isExchangeError} fallback={<ExchangeError />}>
          <Stack>
            <UnitConversion />
            <ConvertedSumLabel />
          </Stack>
        </Show>
      </Group>
      <Group>
        <Select
          label="Исходная валюта"
          value={source}
          onChange={onSourceChange}
          data={currencies ?? []}
        />

        <CurrenciesSwitcher />

        <Select
          label="Целевая валюта"
          value={target}
          onChange={onTargetChanged}
          data={currencies ?? []}
        />
      </Group>
    </Stack>
  )
}
