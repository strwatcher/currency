import { NumberInput } from '@/shared/ui/number-input'
import { useUnit } from 'effector-react'
import { $convertingSum, convertingSumChanged } from '../model'
import { $source } from '@/entities/currencies'

export const ConvertingSumInput = () => {
  const inputProps = useUnit({
    value: $convertingSum,
    onChange: convertingSumChanged,
  })
  const source = useUnit($source)

  return (
    <NumberInput
      label="Сумма конвертации"
      onChange={inputProps.onChange}
      value={inputProps.value ?? ''}
      postfix={source}
    />
  )
}
