import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import BottomScrollListener from './index'

Enzyme.configure({ adapter: new Adapter() })

describe('Bottom Scroll Listener', () => {
  it('shall not render anything if there are no children', () => {
    const wrapper = shallow(<BottomScrollListener onBottom={() => {}} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('shall use lodash.debounce when debounce is more than 0', () => {
    const wrapper = shallow<BottomScrollListener>(<BottomScrollListener debounce={200} onBottom={() => {}} />)
    const functionName = wrapper.instance().handleOnScroll.name

    expect(functionName).toEqual('debounced')
  })

  it('shall not use lodash.debounce when debounce is 0', () => {
    const wrapper = shallow<BottomScrollListener>(<BottomScrollListener debounce={0} onBottom={() => {}} />)

    const functionName = wrapper.instance().handleOnScroll.name

    expect(functionName).toEqual('bound ')
  })

  describe('in normal body scroll mode', () => {
    it('shall render children', () => {
      const wrapper = shallow(
        <BottomScrollListener onBottom={() => {}}>
          <button>hello</button>
        </BottomScrollListener>,
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('shall add a single listener to document on mount', () => {
      const documentSpy = jest.spyOn(document, 'addEventListener')
      const wrapper = shallow<BottomScrollListener>(<BottomScrollListener onBottom={() => {}} />)

      wrapper.instance().componentDidMount()

      expect(documentSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

      documentSpy.mockRestore()
    })

    it('shall remove the event listener on unmount', () => {
      const documentSpy = jest.spyOn(document, 'removeEventListener')
      const wrapper = shallow(<BottomScrollListener onBottom={() => {}} />)

      wrapper.unmount()

      expect(documentSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

      documentSpy.mockRestore()
    })
  })

  describe('in optional specific container mode', () => {
    it('shall render children', () => {
      const wrapper = mount(
        <BottomScrollListener onBottom={() => {}}>
          {(ref: React.Ref<HTMLButtonElement>) => <button ref={ref}>This is example of render child pattern</button>}
        </BottomScrollListener>,
      )

      expect(wrapper).toMatchSnapshot()
    })

    describe('error handling', () => {
      let originalError: Console['error']
      beforeAll(() => {
        originalError = console.error
        console.error = () => {}
      })

      afterAll(() => {
        console.error = originalError
      })

      it('shall not throw error if ref is properly passed to a child on mount', () => {
        const mountComponent = () =>
          mount(
            <BottomScrollListener onBottom={() => {}}>
              {(ref: React.Ref<HTMLDivElement>) => <div ref={ref}>Test div</div>}
            </BottomScrollListener>,
          )

        expect(mountComponent).not.toThrowError()
      })

      it('shall throw error if ref is not passed to a child on mount', () => {
        const mountComponent = () =>
          mount(<BottomScrollListener onBottom={() => {}}>{() => <div>Test div</div>}</BottomScrollListener>)

        expect(mountComponent).toThrowErrorMatchingSnapshot()
      })

      it('shall not throw error if ref is present when component unmounts', () => {
        const wrapper = mount(
          <BottomScrollListener onBottom={() => {}}>
            {(ref: React.Ref<HTMLDivElement>) => <div ref={ref}>Test div</div>}
          </BottomScrollListener>,
        )

        const unmountComponent = () => {
          wrapper.unmount()
        }

        expect(unmountComponent).not.toThrowError()
      })

      it('shall throw error if ref is not present when component unmounts', () => {
        const wrapper = mount<BottomScrollListener>(
          <BottomScrollListener onBottom={() => {}}>
            {(ref: React.Ref<HTMLDivElement>) => <div ref={ref}>Test div</div>}
          </BottomScrollListener>,
        )

        // @ts-ignore
        wrapper.instance().optionalScrollContainerRef.current = null

        const unmountComponent = () => {
          wrapper.unmount()
        }

        expect(unmountComponent).toThrowErrorMatchingSnapshot()
      })
    })
  })
})
