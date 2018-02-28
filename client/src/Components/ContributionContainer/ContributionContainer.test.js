import ContributionContainer from './ContributionContainer';
import React from 'react';
import {shallow} from 'enzyme';

describe('Contribution container tests', () => {
  let renderedComponent;
  

  beforeEach(() => {
    renderedComponent = shallow(
      <ContributionContainer/>);
  });

  it('should render', () => {
    expect(renderedComponent).toBeDefined();
  });

  it('should match the snapshot', () => {
    expect(renderedComponent).toMatchSnapshot();
  });

});