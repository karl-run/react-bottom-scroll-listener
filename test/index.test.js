import React from 'react';
import { shallow } from 'enzyme';

import BottomScrollListener from '../lib/index';

describe('Hello component', () => {
  it('Should not render anything if there are no children', () => {
    const wrapper = shallow(<BottomScrollListener onBottom={() => {}} />);

    expect(wrapper.type()).toEqual(null);
  });

  it('Should render children', () => {
    const wrapper = shallow(<BottomScrollListener onBottom={() => {}}><button>hello</button></BottomScrollListener>);

    expect(wrapper.childAt(0).type()).toEqual('button');
    expect(wrapper.childAt(0).text()).toEqual('hello');
  });

  it('Should add a single listener to document on mount', () => {
    const documentSpy = jest.spyOn(document, 'addEventListener');
    const wrapper = shallow(<BottomScrollListener onBottom={() => {}} />);

    wrapper.instance().componentDidMount();

    expect(documentSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    documentSpy.mockRestore();
  });

  it('Should remove the event listener on unmount', () => {
    const documentSpy = jest.spyOn(document, 'removeEventListener');
    const wrapper = shallow(<BottomScrollListener onBottom={() => {}} />);

    wrapper.instance().componentWillUnmount();

    expect(documentSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    documentSpy.mockRestore();
  });
});
