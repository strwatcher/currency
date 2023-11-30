import { ReactNode, useRef } from 'react'
import s from './section.module.scss'
import { Show } from '@/shared/lib/show'
import cn from 'classnames'
import { IconChevronDown } from '@tabler/icons-react'
import { Group } from '../group'
import { CSSTransition } from 'react-transition-group'

export type SectionProps = {
  title: string
  children?: ReactNode
  opened: boolean
  onToggle?: () => void
  classes?: {
    root?: string
    title?: string
    content?: string
  }
}

export const Section = (props: SectionProps) => {
  const classes = props.classes ?? ({} as Record<string, string>)
  const contentRef = useRef(null)

  return (
    <section
      className={cn(
        s['section-root'],
        classes.root,
        props.opened && s['opened']
      )}
    >
      <Group classes={{ root: s['section-header'] }} onClick={props.onToggle}>
        <h1 className={cn(['section-title'], classes.title)}>{props.title}</h1>
        <Show when={!!props.onToggle}>
          <IconChevronDown className={s['section-icon']} />
        </Show>
      </Group>
      <CSSTransition
        in={props.opened}
        nodeRef={contentRef}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: s['section-content-enter'],
          enterActive: s['section-content-enter-active'],
          exit: s['section-content-exit'],
          exitActive: s['section-content-exit-active'],
          exitDone: s['section-content-exit-done'],
        }}
      >
        <div
          ref={contentRef}
          className={cn(s['section-content'], classes.content)}
        >
          {props.children}
        </div>
      </CSSTransition>
    </section>
  )
}
