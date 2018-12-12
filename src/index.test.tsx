import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import BottomScrollListener from './index'

Enzyme.configure({ adapter: new Adapter() })

describe('Hello component', () => {
  it('Should not render anything if there are no children', () => {
    const wrapper = shallow(<BottomScrollListener onBottom={() => {}} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('Should render children', () => {
    const wrapper = shallow(
      <BottomScrollListener onBottom={() => {}}>
        <button>hello</button>
      </BottomScrollListener>,
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('Should add a single listener to document on mount', () => {
    const documentSpy = jest.spyOn(document, 'addEventListener')
    const wrapper = shallow(<BottomScrollListener onBottom={() => {}} />)

    wrapper.instance().componentDidMount()

    expect(documentSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    documentSpy.mockRestore()
  })

  it('Should remove the event listener on unmount', () => {
    const documentSpy = jest.spyOn(document, 'removeEventListener')
    const wrapper = shallow(<BottomScrollListener onBottom={() => {}} />)

    wrapper.instance().componentWillUnmount()

    expect(documentSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    documentSpy.mockRestore()
  })

  it('Should use lodash.debounce when debounce is more than 0', () => {
    const wrapper = shallow(<BottomScrollListener debounce={200} onBottom={() => {}} />)
    const functionName = wrapper.instance().handleOnScroll.name

    expect(functionName).toEqual('debounced')
  })

  it('Should not use lodash.debounce when debounce is 0', () => {
    const wrapper = shallow(<BottomScrollListener debounce={0} onBottom={() => {}} />)
    const functionName = wrapper.instance().handleOnScroll.name

    expect(functionName).toEqual('bound ')
  })
})
