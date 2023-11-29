import { ChangeEventHandler } from 'react'
import { BaseInput, BaseInputProps } from '../base-input'

export type NumberInputProps = BaseInputProps & {
  onChange: (value: number) => void
  value?: number
}
export const NumberInput = (props: NumberInputProps) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!props.onChange) return
    props.onChange(Number(event.target.value))
  }

  const input = (className: string, id: string) => (
    <input
      className={className}
      id={id}
      value={props.value}
      type="number"
      onChange={onChange}
    />
  )
  const isActive = typeof props.value === 'number'

  return (
    <BaseInput
      error={props.error}
      label={props.label}
      active={isActive}
      input={input}
    />
  )
}