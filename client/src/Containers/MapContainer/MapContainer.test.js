import MapContainer from './MapContainer'
import React from 'react';
import {shallow} from 'enzyme';

describe('Map container', () => {
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = shallow(
      <MapContainer />
    )
  })

  it('should render', () => {
    expect(renderedComponent).toBeDefined()
  })

  it('should match the snapshot', () => {
    expect(renderedComponent).toMatchSnapshot();
  })

  it('should have a class map container and map totals', () => {
    expect(renderedComponent.find('.map-container').length).toEqual(1);
    expect(renderedComponent.find('.map-totals').length).toEqual(1);
  })

})