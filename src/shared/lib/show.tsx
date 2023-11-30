import { ReactNode } from 'react'

export type ShowProps<T> = {
  when?: false | T
  fallback?: ReactNode
  children: ((value: T) => JSX.Element) | ReactNode
}

export const Show = <T,>(props: ShowProps<T>) => {
  if (!props.when) {
    return props.fallback ?? null
  }

  if (typeof props.children === 'function') {
    return props.children(props.when as T)
  }

  return props.children
}
