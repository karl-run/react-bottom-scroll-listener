import lodashDebounce from 'lodash.debounce'
import { type RefObject, useCallback, useEffect, useMemo, useRef } from 'react'

export type DebounceOptions = Parameters<typeof lodashDebounce>[2]

const createCallback = (debounce: number, handleOnScroll: () => void, options: DebounceOptions): (() => void) => {
  if (debounce) {
    return lodashDebounce(handleOnScroll, debounce, options)
  }

  return handleOnScroll
}

/**
 * @description
 *  A react hook that invokes a callback when user scrolls to the bottom
 *
 * @param onBottom Required callback that will be invoked when scrolled to bottom
 * @param {Object} options - Optional parameters
 * @param {number} [options.offset=0] - Offset from bottom of page in pixels. E.g. 300 will trigger onBottom 300px from the bottom of the page
 * @param {number} [options.debounce=200] - Optional debounce in milliseconds, defaults to 200ms
 * @param {DebounceOptions} [options.debounceOptions={leading=true}] - Options passed to lodash.debounce, see https://lodash.com/docs/4.17.15#debounce
 * @param {boolean} [options.triggerOnNoScroll=false] - Triggers the onBottom callback when the page has no scrollbar
 * @returns {RefObject} ref - If passed to a element as a ref, e.g. a div it will register scrolling to the bottom of that div instead of document viewport
 */
function useBottomScrollListener<T extends HTMLElement>(
  onBottom: () => void,
  options?: {
    offset?: number
    debounce?: number
    debounceOptions?: DebounceOptions
    triggerOnNoScroll?: boolean
  },
): RefObject<T | null> {
  const { offset, triggerOnNoScroll, debounce, debounceOptions } = useMemo(
    () => ({
      offset: options?.offset ?? 0,
      debounce: options?.debounce ?? 200,
      debounceOptions: options?.debounceOptions ?? { leading: true },
      triggerOnNoScroll: options?.triggerOnNoScroll ?? false,
    }),
    [options?.offset, options?.debounce, options?.debounceOptions, options?.triggerOnNoScroll],
  )

  const debouncedOnBottom = useMemo(
    () => createCallback(debounce, onBottom, debounceOptions),
    [debounce, onBottom, debounceOptions],
  )
  const containerRef = useRef<T>(null)
  const handleOnScroll = useCallback(() => {
    if (containerRef.current != null) {
      const scrollNode: T = containerRef.current
      const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + scrollNode.clientHeight)
      const scrollPosition = Math.round(scrollNode.scrollHeight - offset)

      if (scrollPosition <= scrollContainerBottomPosition) {
        debouncedOnBottom()
      }
    } else {
      const scrollNode: Element = document.scrollingElement || document.documentElement
      const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + window.innerHeight)
      const scrollPosition = Math.round(scrollNode.scrollHeight - offset)

      if (scrollPosition <= scrollContainerBottomPosition) {
        debouncedOnBottom()
      }
    }
    // ref dependency needed for the tests, doesn't matter for normal execution
  }, [offset, debouncedOnBottom])

  useEffect((): (() => void) => {
    const ref: T | null = containerRef.current
    if (ref != null) {
      ref.addEventListener('scroll', handleOnScroll)
    } else {
      window.addEventListener('scroll', handleOnScroll)
    }

    if (triggerOnNoScroll) {
      handleOnScroll()
    }

    return () => {
      if (ref != null) {
        ref.removeEventListener('scroll', handleOnScroll)
      } else {
        window.removeEventListener('scroll', handleOnScroll)
      }
    }
  }, [handleOnScroll, triggerOnNoScroll])

  return containerRef
}

export default useBottomScrollListener
