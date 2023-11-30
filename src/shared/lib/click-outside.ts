import { useEffect, useRef } from 'react'

export function useClickOutside<El extends HTMLElement>(callback: () => void) {
  const ref = useRef<El>(null)
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as El)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  return ref
}
