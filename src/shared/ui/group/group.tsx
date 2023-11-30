import { ReactNode } from 'react'
import cn from 'classnames'

import s from './group.module.scss'

export type GroupProps = {
  children: ReactNode
  classes?: {
    root?: string
  }
}

export const Group = (props: GroupProps) => {
  const classes = props.classes ?? ({} as Record<string, string>)

  return (
    <div className={cn([s['group-root'], classes.root])}>{props.children}</div>
  )
}
