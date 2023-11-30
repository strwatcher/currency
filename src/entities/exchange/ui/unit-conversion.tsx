import { $source, $target } from '@/entities/currencies'
import { Label } from '@/shared/ui/label'
import { $ratio } from '../model'
import { useUnit } from 'effector-react'
import { formatCurrency } from '@/shared/lib/format-currency'

export const UnitConversion = () => {
  const { target, source, ratio } = useUnit({
    target: $target,
    source: $source,
    ratio: $ratio,
  })
  return (
    <Label>
      1 {source} = {formatCurrency(ratio)} {target}
    </Label>
  )
}
