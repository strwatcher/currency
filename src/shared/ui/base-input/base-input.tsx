import cn from 'classnames'
import { useId } from 'react'
import s from './base-input.module.scss'
import { Show } from '../../lib/show'

export type BaseInputProps = {
  label?: string
  input: (className: string, id: string) => JSX.Element
  active?: boolean
  error?: string
  postfix?: string
}

export type PublicBaseInputProps = Omit<BaseInputProps, 'input' | 'active'>

export const BaseInput = (props: BaseInputProps) => {
  const id = useId()
  return (
    <div
      className={cn(
        {
          [s.active]: props.active,
          [s.error]: !!props.error,
          [s.withPostfix]: !!props.postfix,
        },
        s['input-root']
      )}
      data-postfix={props.postfix}
    >
      <Show when={props.error}>
        <span className={s['input-error']}>{props.error}</span>
      </Show>
      <label htmlFor={id} className={s['input-label']}>
        {props.label}
      </label>
      {props.input(s['input-inner'], id)}
    </div>
  )
}
