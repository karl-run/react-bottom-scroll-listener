import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import type React from 'react'

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
      // @ts-expect-error scrollHeight is a mock property
      document.documentElement.scrollHeight = 1200
      document.documentElement.scrollTop = 400

      window.dispatchEvent(new Event('scroll'))

      expect(onBottom).not.toHaveBeenCalled()
    })

    it('shall invoke onBottom when body is exactly at bottom', async () => {
      const onBottom = vi.fn()

      renderHook(() => useBottomScrollListener(onBottom, { offset: 0, debounce: 0 }))

      // window size is 768.
      // 768 + 432 = 1200, should scroll
      // @ts-expect-error scrollHeight is a mock property
      document.documentElement.scrollHeight = 1200
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
    const TestComponent = ({ onBottom }: { onBottom: () => void }) => {
      const ref = useBottomScrollListener<HTMLDivElement>(onBottom, { offset: 0, debounce: 0 })

      return (
        <div ref={ref} style={{ height: '600px' }} data-testid="container">
          <h1>I am test</h1>
        </div>
      )
    }

    afterEach(cleanup)

    it('shall not invoke onBottom when container has not hit bottom', () => {
      const onBottom = vi.fn()
      render(<TestComponent onBottom={onBottom} />)

      const container: { clientHeight: number; scrollHeight: number; scrollTop: number } =
        screen.getByTestId('container')

      // container size is 600.
      // 600 + 300 = 900, should not scroll
      container.clientHeight = 600
      container.scrollHeight = 1000
      container.scrollTop = 300

      fireEvent.scroll(container as Element, { target: { scrollY: 300 } })

      expect(onBottom).not.toHaveBeenCalled()
    })

    it('shall invoke onBottom when container is exactly at bottom', () => {
      const onBottom = vi.fn()
      render(<TestComponent onBottom={onBottom} />)

      const container: { clientHeight: number; scrollHeight: number; scrollTop: number } =
        screen.getByTestId('container')

      // container size is 600.
      // 600 + 400 = 1000, should scroll
      container.clientHeight = 600
      container.scrollHeight = 1000
      container.scrollTop = 400

      fireEvent.scroll(container as Element, { target: { scrollY: 400 } })

      expect(onBottom).toHaveBeenCalledTimes(1)
    })
  })
})
