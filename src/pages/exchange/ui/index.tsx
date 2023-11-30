import { Stack } from '@/shared/ui/stack'
import { Converter } from '@/widgets/converter'
import { ConverterList } from '@/widgets/converter-list'
import { useSections } from '../model/sections'
import s from './exchange-page.module.scss'
import { ConvertHistory } from '@/widgets/convert-history'

export const ExchangePage = () => {
  const {
    convertListOpened,
    onConvertListToggle,
    historyOpened,
    onHistoryToggle,
  } = useSections()
  return (
    <Stack classes={{ root: s['page-root'] }}>
      <Converter />
      <ConverterList
        opened={convertListOpened}
        onToggle={onConvertListToggle}
      />
      <ConvertHistory opened={historyOpened} onToggle={onHistoryToggle} />
    </Stack>
  )
}
