import { Label } from '@/shared/ui/label/label'
import { useUnit } from 'effector-react'
import { $convertedSum } from '../model'
import { $target } from '@/entities/currencies'
import { formatCurrency } from '@/shared/lib/format-currency'

export const ConvertedSumLabel = () => {
  const convertedSum = useUnit($convertedSum)
  const target = useUnit($target)
  return (
    <Label>
      Сумма после конвертации: {formatCurrency(convertedSum)} {target}
    </Label>
  )
}
