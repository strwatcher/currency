import { ChangeEventHandler, useState } from 'react'
import { BaseInput, BaseInputProps } from '../base-input'
import s from './select.module.scss'
import {
  autoUpdate,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react'

import { useFloating, shift } from '@floating-ui/react'
import cn from 'classnames'
import { IconChevronDown } from '@tabler/icons-react'
import { useClickOutside } from '@/shared/lib/click-outside'
import { Show } from '@/shared/lib/show'

type SelectItem =
  | {
      value: string
      label: string
    }
  | string

export type SelectProps = Omit<BaseInputProps, 'postfix'> & {
  value?: string
  data: SelectItem[]
  onChange?: (value: string) => void
  label?: string
  error?: string
  classes?: {
    root?: string
  }
}

export const Select = (props: SelectProps) => {
  const [isOpened, setOpened] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: 'bottom',
    middleware: [shift()],
    open: isOpened,
    onOpenChange: setOpened,
  })

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 300,
    initial: {
      opacity: 0,
      translate: '0 -60px',
    },
  })

  const outsideRef = useClickOutside<HTMLDivElement>(() => setOpened(false))
  const referenceRef = useMergeRefs([refs.setReference, outsideRef])

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (!props.onChange) return
    props.onChange(event.target.value)
  }

  const selectItems = props.data.map((item) => {
    if (typeof item === 'string') return { value: item, label: item }
    return item
  })

  const select = (className: string, selectId: string, labelId: string) => {
    return (
      <>
        <select
          className={cn(className, s.select, s.native)}
          id={selectId}
          aria-labelledby={labelId}
          onChange={onChange}
        >
          {selectItems.map((selectItem) => (
            <option key={selectItem.value} value={selectItem.value}>
              {selectItem.label}
            </option>
          ))}
        </select>
        <div
          ref={referenceRef}
          className={cn(className, s.select, s.custom)}
          onClick={() => setOpened(!isOpened)}
          aria-hidden={true}
        >
          <div className={cn(s['select-value'])}>{props.value}</div>
          <Show when={isMounted}>
            <div
              className={s['select-popup']}
              ref={refs.setFloating}
              style={{ ...floatingStyles, ...transitionStyles }}
            >
              <div className={cn(s['select-options'])}>
                {selectItems.map((selectItem) => (
                  <div
                    onClick={() =>
                      props.onChange && props.onChange(selectItem.value)
                    }
                    className={cn(
                      s['select-option'],
                      selectItem.value === props.value && s['active']
                    )}
                    data-value={selectItem.value}
                    key={selectItem.value}
                  >
                    {selectItem.value}
                  </div>
                ))}
              </div>
            </div>
          </Show>
        </div>
        <IconChevronDown className={s['select-icon']} />
      </>
    )
  }

  const label = (className: string, id: string) => {
    return (
      <span className={className} id={id}>
        {props.label}
      </span>
    )
  }

  const isActive = !!props.value
  return (
    <BaseInput
      labelComponent={label}
      input={select}
      active={isActive}
      focused={isOpened}
      error={props.error}
      classes={{
        focused: s.focused,
        error: s.error,
        'input-root': cn(s['select-root'], props.classes?.root),
        'input-label': s['select-label'],
      }}
    />
  )
}
