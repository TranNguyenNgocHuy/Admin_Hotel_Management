import { useEffect, useRef } from 'react'

type Hanler = () => void

export function useOutsideClick(handler: Hanler, listenCapturing: boolean = true) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        handler()
      }
    }

    document.addEventListener('click', handleClick, listenCapturing)

    return () => document.removeEventListener('click', handleClick, listenCapturing)
  }, [handler, listenCapturing])

  return ref
}
