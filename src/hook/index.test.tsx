import React from 'react'
import ReactDOM from 'react-dom'
import { renderHook } from 'react-hooks-testing-library'

import useBottomScrollListener from './'

/* Mock out scrollHeight so we can change it before dispatching scroll event */
Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
  configurable: true,
  get: function() {
    return this._scrollHeight || 0
  },
  set(val) {
    this._scrollHeight = val
  },
})

/* Mock out clientHeight so we can change it before dispatching scroll event in custom containers */
Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
  configurable: true,
  get: function() {
    return this._clientHeight || 0
  },
  set(val) {
    this._clientHeight = val
  },
})

describe('useBottomScrollListener', () => {
  describe('given no ref it should use the document and', () => {
    it('shall not invoke onBottom when body has not hit bottom', async () => {
      const onBottom = jest.fn()

      renderHook(() => useBottomScrollListener(onBottom, 0, 0))

      // window size is 768.
      // 768 + 400 = 1168, should not scroll

      // @ts-ignore
      document.documentElement.scrollHeight = 1200
      document.documentElement.scrollTop = 400

      window.dispatchEvent(new Event('scroll'))

      expect(onBottom).not.toHaveBeenCalled()
    })

    it('shall invoke onBottom when body is exactly at bottom', async () => {
      const onBottom = jest.fn()

      renderHook(() => useBottomScrollListener(onBottom, 0, 0))

      // window size is 768.
      // 768 + 432 = 1200, should scroll

      // @ts-ignore
      document.documentElement.scrollHeight = 1200
      document.documentElement.scrollTop = 432

      window.dispatchEvent(new Event('scroll'))

      expect(onBottom).toHaveBeenCalledTimes(1)
    })
  })

  describe('given a ref it should use the given ref and', () => {
    const setupFakeContainer = (containerRef: React.RefObject<HTMLDivElement>) => {
      const div = document.createElement('div')
      // eslint-disable-next-line react/no-render-return-value, @typescript-eslint/no-explicit-any
      const renderedNode: HTMLDivElement = ReactDOM.render(<div ref={containerRef} />, div) as any

      // @ts-ignore
      renderedNode.clientHeight = 600

      let triggerScroll: (() => void) | null = null
      renderedNode.addEventListener = jest.fn().mockImplementation((_, cb) => {
        triggerScroll = cb
      })

      return { renderedNode, getTriggerScroll: () => triggerScroll }
    }

    it('shall not invoke onBottom when container has not hit bottom', async done => {
      const onBottom = jest.fn()

      const hook = renderHook(() => useBottomScrollListener<HTMLDivElement>(onBottom, 0, 0))
      const containerRef: React.RefObject<HTMLDivElement> = hook.result.current

      const { renderedNode, getTriggerScroll } = setupFakeContainer(containerRef)

      hook.rerender()

      const triggerScroll = getTriggerScroll()
      if (triggerScroll == null) {
        return done.fail('Hook setup failed, callback never set')
      }

      // container size is 600.
      // 600 + 300 = 900, should not scroll

      // @ts-ignore
      renderedNode.scrollHeight = 1000
      renderedNode.scrollTop = 300

      triggerScroll()

      expect(onBottom).not.toHaveBeenCalled()

      done()
    })

    it('shall invoke onBottom when container is exactly at bottom', async done => {
      const onBottom = jest.fn()

      const hook = renderHook(() => useBottomScrollListener<HTMLDivElement>(onBottom, 0, 0))
      const containerRef: React.RefObject<HTMLDivElement> = hook.result.current

      const { renderedNode, getTriggerScroll } = setupFakeContainer(containerRef)

      hook.rerender()

      const triggerScroll = getTriggerScroll()
      if (triggerScroll == null) {
        return done.fail('Hook setup failed, callback never set')
      }

      // container size is 600.
      // 600 + 400 = 1000, should scroll

      // @ts-ignore
      renderedNode.scrollHeight = 1000
      renderedNode.scrollTop = 400

      triggerScroll()

      expect(onBottom).toHaveBeenCalledTimes(1)

      done()
    })
  })
})
