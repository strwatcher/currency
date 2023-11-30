import { ReactNode } from 'react'
import cn from 'classnames'
import { BaseComponentProps } from '../base'
import s from './button.module.scss'

export type ButtonProps = BaseComponentProps & {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  classes?: {
    root?: string
  }

  variant?: 'primary' | 'light'
}

export const Button = ({ children, variant, ...props }: ButtonProps) => {
  const classes = props.classes ?? ({} as Record<string, string>)
  return (
    <button
      className={cn([
        s['button-root'],
        s[`button-variant-${variant}`],
        classes.root,
      ])}
      {...props}
    >
      {children}
    </button>
  )
}
