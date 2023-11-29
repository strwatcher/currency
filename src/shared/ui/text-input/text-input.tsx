import { ChangeEventHandler } from 'react'
import { BaseInput, BaseInputProps } from '../base-input'

export type TextInputProps = BaseInputProps & {
  value?: string
  onChange?: (value: string) => void
  type?: 'text' | 'password' | 'tel' | 'email'
}

export const TextInput = (props: TextInputProps) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!props.onChange) return
    props.onChange(event.target.value)
  }

  const input = (className: string, id: string) => (
    <input
      value={props.value}
      onChange={onChange}
      type={props.type}
      className={className}
      id={id}
    />
  )

  const isActive = !!props.value

  return (
    <BaseInput
      label={props.label}
      input={input}
      error={props.error}
      active={isActive}
    />
  )
}
