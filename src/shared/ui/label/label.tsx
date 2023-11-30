import cn from 'classnames'
import s from './label.module.scss'
import { ReactNode } from 'react'

export type LabelProps = {
  children: ReactNode
  variant?: 'primary' | 'error'
  classes?: {
    root?: string
  }
}

export const Label = (props: LabelProps) => {
  const classes = props.classes ?? ({} as Record<string, string>)
  return (
    <p
      className={cn(
        s['label-root'],
        classes.root,
        s[`label-variant-${props.variant}`]
      )}
    >
      {props.children}
    </p>
  )
}
