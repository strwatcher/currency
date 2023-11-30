import cn from 'classnames'
import { useId } from 'react'
import s from './base-input.module.scss'
import { Show } from '../../lib/show'
import { BaseComponentProps } from '../base'

export type BaseInputProps = BaseComponentProps & {
  label?: string
  input: (className: string, inputId: string, labelId: string) => JSX.Element
  labelComponent?: (className: string, labelId: string) => JSX.Element
  active?: boolean
  focused?: boolean
  error?: string
  postfix?: string
  classes?: {
    'input-root'?: string
    'input-inner'?: string
    'input-label'?: string
    'input-error'?: string
    error?: string
    withPostfix?: string
    active?: string
    focused?: string
  }
}

export type PublicBaseInputProps = Omit<BaseInputProps, 'input' | 'active'>

export const BaseInput = (props: BaseInputProps) => {
  const inputId = useId()
  const labelId = useId()
  const classes = props.classes ?? ({} as Record<string, string>)
  return (
    <div
      className={cn(
        props.focused && [s.focused, classes.focused],
        props.active && [s.active, classes.active],
        !!props.error && [s.error, classes.error],
        !!props.postfix && [s.withPostfix, classes.withPostfix],
        s['input-root'],
        classes['input-root']
      )}
      data-postfix={props.postfix}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <Show when={props.error}>
        <span className={cn(s['input-error'], classes['input-error'])}>
          {props.error}
        </span>
      </Show>
      {props.input(
        cn(s['input-inner'], classes['input-inner']),
        inputId,
        labelId
      )}
      <Show
        when={props.labelComponent}
        fallback={
          <label
            htmlFor={inputId}
            className={cn(s['input-label'], classes['input-label'])}
          >
            {props.label}
          </label>
        }
      >
        {(labelComponent) =>
          labelComponent(cn(s['input-label'], classes['input-label']), labelId)
        }
      </Show>
    </div>
  )
}
