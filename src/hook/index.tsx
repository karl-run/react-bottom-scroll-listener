import { useCallback, useEffect, useRef } from 'react'
import lodashDebounce from 'lodash.debounce'

const createCallback = (debounce: number, handleOnScroll: () => void): (() => void) => {
  if (debounce) {
    return lodashDebounce(handleOnScroll, debounce, { trailing: true })
  } else {
    return handleOnScroll
  }
}

function useBottomScrollListener<T extends HTMLElement>(
  onBottom: () => void,
  offset: number = 0,
  debounce: number = 200,
) {
  const containerRef = useRef<T>(null)
  const handleOnScroll = useCallback(() => {
    if (containerRef.current != null) {
      const scrollNode: T = containerRef.current
      const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + scrollNode.clientHeight)
      const scrollPosition = Math.round(scrollNode.scrollHeight - offset)

      if (scrollPosition <= scrollContainerBottomPosition) {
        onBottom()
      }
    } else {
      const scrollNode: Element = document.scrollingElement || document.documentElement
      const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + window.innerHeight)
      const scrollPosition = Math.round(scrollNode.scrollHeight - offset)

      if (scrollPosition <= scrollContainerBottomPosition) {
        onBottom()
      }
    }
  }, [offset, onBottom, containerRef.current])

  useEffect((): (() => void) => {
    const callback: () => void = createCallback(debounce, handleOnScroll)
    const ref: T | null = containerRef.current

    if (ref != null) {
      ref.addEventListener('scroll', callback)
    } else {
      window.addEventListener('scroll', callback)
    }

    return () => {
      if (ref != null) {
        ref.removeEventListener('scroll', callback)
      } else {
        window.removeEventListener('scroll', callback)
      }
    }
  }, [handleOnScroll, debounce])

  return containerRef
}

export default useBottomScrollListener
