import Card from './Card';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';



describe('card', () => {
  it('should match its snapshot', () => {


    const card = shallow(<Card
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

  