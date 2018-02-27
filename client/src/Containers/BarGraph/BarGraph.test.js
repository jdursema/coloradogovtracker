import BarGraph from './BarGraph';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';



describe('BarGraph', () => {
  const fakeStore = configureMockStore()({errorStatus: {
    isError: false,
    errorMsg: ''
    }
  })
  it('should match its snapshot', () => {


    const BarGraph = shallow(<BarGraph
      id = {42}
      amount = {43}
      firstName = "Tommy"
      lastName = "Pickles"
      recordId = {6578998}
      date = "5/26/17 0:00"
      occupation = 'Director'
    />);

    expect(card).toMatchSnapshot();
  });


})
