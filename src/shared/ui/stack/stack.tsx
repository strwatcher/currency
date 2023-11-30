import { ReactNode } from 'react'
import cn from 'classnames'

import s from './stack.module.scss'

export type StackProps = {
  children: ReactNode
  classes?: {
    root?: string
  }
}

export const Stack = (props: StackProps) => {
  const classes = props.classes ?? ({} as Record<string, string>)

  return (
    <div className={cn([s['stack-root'], classes.root])}>{props.children}</div>
  )
}
