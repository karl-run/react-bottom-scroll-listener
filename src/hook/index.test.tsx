import { describe, expect, it, vi } from 'vitest'

import { renderHook } from '@testing-library/react-hooks'
import type React from 'react'
import ReactDOM from 'react-dom'

import useBottomScrollListener from './'

/* Mock out scrollHeight so we can change it before dispatching scroll event */
Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
  configurable: true,
  get: function () {
    return this._scrollHeight || 0
  },
  set(val) {
    this._scrollHeight = val
  },
})

/* Mock out clientHeight so we can change it before dispatching scroll event in custom containers */
Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
  configurable: true,
  get: function () {
    return this._clientHeight || 0
  },
  set(val) {
    this._clientHeight = val
  },
})

describe('useBottomScrollListener', () => {
  describe('given no ref it should use the document and', () => {
    it('shall not invoke onBottom when body has not hit bottom', async () => {
      const onBottom = vi.fn()

      renderHook(() => useBottomScrollListener(onBottom, { offset: 0, debounce: 0 }))

      // window size is 768.
      // 768 + 400 = 1168, should not scroll
      ;(document.documentElement as unknown as Record<string, unknown>).scrollHeight = 1200
      document.documentElement.scrollTop = 400

      window.dispatchEvent(new Event('scroll'))

      expect(onBottom).not.toHaveBeenCalled()
    })

    it('shall invoke onBottom when body is exactly at bottom', async () => {
      const onBottom = vi.fn()

      renderHook(() => useBottomScrollListener(onBottom, { offset: 0, debounce: 0 }))

      // window size is 768.
      // 768 + 432 = 1200, should scroll
      ;(document.documentElement as unknown as Record<string, unknown>).scrollHeight = 1200
      document.documentElement.scrollTop = 432

      window.dispatchEvent(new Event('scroll'))

      expect(onBottom).toHaveBeenCalledTimes(1)
    })

    it('shall invoke onBottom when there is no place to scroll with triggerOnNoScroll true', () => {
      const onBottom = vi.fn()
      renderHook(() => useBottomScrollListener(onBottom, { triggerOnNoScroll: true }))
      expect(onBottom).toHaveBeenCalledTimes(1)
    })
  })

  describe('given a ref it should use the given ref and', () => {
    const setupFakeContainer = (containerRef: React.RefObject<HTMLDivElement>) => {
      const div = document.createElement('div')

      // biome-ignore lint: should be migrated to a more modern way of doing this
      const renderedNode: HTMLDivElement = ReactDOM.render(<div ref={containerRef} />, div) as unknown as HTMLDivElement

      ;(renderedNode as unknown as Record<string, unknown>).clientHeight = 600

      let triggerScroll: (() => void) | null = null
      renderedNode.addEventListener = vi.fn().mockImplementation((_, cb) => {
        triggerScroll = cb
      })

      return { renderedNode, getTriggerScroll: () => triggerScroll }
    }

    it('shall not invoke onBottom when container has not hit bottom', () => {
      const onBottom = vi.fn()

      const hook = renderHook(() => useBottomScrollListener<HTMLDivElement>(onBottom, { offset: 0, debounce: 0 }))
      const containerRef: React.RefObject<HTMLDivElement> = hook.result.current

      const { renderedNode, getTriggerScroll } = setupFakeContainer(containerRef)

      hook.rerender()

      const triggerScroll = getTriggerScroll()
      if (triggerScroll == null) {
        throw new Error('Hook setup failed, callback never set')
      }

      // container size is 600.
      // 600 + 300 = 900, should not scroll
      ;(renderedNode as unknown as Record<string, unknown>).scrollHeight = 1000
      renderedNode.scrollTop = 300

      triggerScroll()

      expect(onBottom).not.toHaveBeenCalled()
    })

    it('shall invoke onBottom when container is exactly at bottom', () => {
      const onBottom = vi.fn()

      const hook = renderHook(() => useBottomScrollListener<HTMLDivElement>(onBottom, { offset: 0, debounce: 0 }))
      const containerRef: React.RefObject<HTMLDivElement> = hook.result.current

      const { renderedNode, getTriggerScroll } = setupFakeContainer(containerRef)

      hook.rerender()

      const triggerScroll = getTriggerScroll()
      if (triggerScroll == null) {
        throw new Error('Hook setup failed, callback never set')
      }

      // container size is 600.
      // 600 + 400 = 1000, should scroll

      ;(renderedNode as unknown as Record<string, unknown>).scrollHeight = 1000
      renderedNode.scrollTop = 400

      triggerScroll()

      expect(onBottom).toHaveBeenCalledTimes(1)
    })
  })
})
