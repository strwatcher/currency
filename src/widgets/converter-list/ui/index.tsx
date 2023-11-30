import { $source, $target } from '@/entities/currencies'
import { $ratio } from '@/entities/exchange'
import { Group } from '@/shared/ui/group'
import { List } from '@/shared/ui/list'
import { useUnit } from 'effector-react'
import { convertUnit, currencyUnits } from '../lib'
import { Section } from '@/shared/ui/section'
import { formatCurrency } from '@/shared/lib/format-currency'
import s from './converter-list.module.scss'

export type ConverterListProps = {
  opened: boolean
  onToggle: () => void
}
export const ConverterList = (props: ConverterListProps) => {
  const { ratio, source, target } = useUnit({
    ratio: $ratio,
    source: $source,
    target: $target,
  })

  return (
    <Section
      title="Список стоимостей"
      opened={props.opened}
      onToggle={props.onToggle}
      classes={{ root: s['converter-list-root'] }}
    >
      <Group classes={{ root: s['converter-list-group'] }}>
        <List
          title={`${source} -> ${target}`}
          items={currencyUnits.map(
            (unit) =>
              `${unit} ${source} -> ${formatCurrency(
                convertUnit(unit, ratio)
              )} ${target}`
          )}
        />
        <List
          title={`${target} -> ${source}`}
          items={currencyUnits.map(
            (unit) =>
              `${unit} ${target} -> ${formatCurrency(
                convertUnit(unit, 1 / ratio)
              )} ${source}`
          )}
        />
      </Group>
    </Section>
  )
}
