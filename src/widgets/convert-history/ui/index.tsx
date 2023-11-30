import { HistoryItem, getHistoryQuery } from '@/shared/api/exchange'
import { Section } from '@/shared/ui/section'
import { useUnit } from 'effector-react'
import { AxisOptions, Chart } from 'react-charts'
import s from './convert-history.module.scss'

export type ConvertHistoryProps = {
  opened: boolean
  onToggle: () => void
}

export const ConvertHistory = (props: ConvertHistoryProps) => {
  const history = useUnit(getHistoryQuery.$data)
  const primaryAxis: AxisOptions<HistoryItem> = {
    getValue: (item) => item.date,
  }

  const secondaryAxes: AxisOptions<HistoryItem>[] = [
    {
      getValue: (item) => item.ratio,
    },
  ]
  return (
    <Section
      opened={props.opened}
      onToggle={props.onToggle}
      title="История конвертации"
      classes={{
        root: s['convert-history-root'],
        content: s['convert-history-content'],
      }}
    >
      <Chart
        className={s['convert-history-chart']}
        options={{
          data: [{ label: 'test', data: history ?? [] }],
          primaryAxis,
          secondaryAxes,
        }}
      />
    </Section>
  )
}
