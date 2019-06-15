import { useCallback, useEffect, useRef } from 'react'
import lodashDebounce from 'lodash.debounce'

const createCallback = (debounce: number, handleOnScroll: () => void): (() => void) => {
  if (debounce) {
    return lodashDebounce(handleOnScroll, debounce, { trailing: true })
  } else {
    return handleOnScroll
  }
}

/**
 *  A react hook that invokes a callback when user scrolls to the bottom
 *
 * @param onBottom Required callback that will be invoked when scrolled to bottom
 * @param offset Offset from bottom of page in pixels. E.g. 300 will trigger onBottom 300px from the bottom of the page
 * @param debounce Optional debounce in milliseconds, defaults to 200ms
 * @return React.MutableRefObject Optionally you can use this to pass to a element to use that as the scroll container
 */
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
    // ref dependency needed for the tests, doesn't matter for normal execution
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
