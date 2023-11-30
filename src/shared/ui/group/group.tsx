import { ReactNode } from 'react'
import cn from 'classnames'

import s from './group.module.scss'
import { BaseComponentProps } from '../base'

export type GroupProps = BaseComponentProps & {
  children: ReactNode
  classes?: {
    root?: string
  }
}

export const Group = (props: GroupProps) => {
  const classes = props.classes ?? ({} as Record<string, string>)

  return (
    <div className={cn([s['group-root'], classes.root])} {...props}>
      {props.children}
    </div>
  )
}
