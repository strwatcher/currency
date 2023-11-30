import { ReactNode } from 'react'
import s from './layout.module.scss'

export type LayoutProps = {
  children: ReactNode
}

export const Layout = (props: LayoutProps) => {
  return <div className={s['layout-root']}>{props.children}</div>
}
