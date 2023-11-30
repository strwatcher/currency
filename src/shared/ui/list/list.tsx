import { Label } from '../label'
import s from './list.module.scss'

export type ListProps = {
  items: string[]
  title: string
}

export const List = (props: ListProps) => {
  return (
    <div className={s['list-root']}>
      <h3 className={s['list-title']}>{props.title}</h3>
      <ul className={s['list-inner']}>
        {props.items.map((item, index) => (
          <li className={s['list-item']} key={index}>
            <Label>{item}</Label>
          </li>
        ))}
      </ul>
    </div>
  )
}
