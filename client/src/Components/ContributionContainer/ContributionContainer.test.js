import ContributionContainer from './ContributionContainer'
import React from 'react';
import {shallow} from 'enzyme';
import contributions from '../../mockdata/mockStore.js';

describe('Contribution container tests', () => {
  let mockContributions = contributions;
  let renderedComponent;
  

  beforeEach(() => {
     renderedComponent = shallow(
    <ContributionContainer/>)
  })

it('should render', () => {
  expect(renderedComponent).toBeDefined();
})

it('should match the snapshot', () => {
  expect(renderedComponent).toMatchSnapshot();
})

})