import React from 'react';
import Enzyme from 'enzyme';
import {initialCandidatesFetch} from './helper';

describe('initialCandidatesFetch', () => {
  beforeEach(() => {
    window.fetch =
    jest.fn().mockImplementation(()=> 
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(
          {candidates:[
            {
              active: true,
              candidate_id: "20175032046",
              committee_id: "20175032028",
              committee_name: "Cary Kennedy For Governor",
              full_name: "Cary Kennedy",
              id: 361,
              image: "http://msantray.fatcow.com/governor_photos/cary_kennedy.jpeg",
              last_name: "Kennedy",
              party: "Democrat",
              website: "http://carykennedyforgovernor.com/"},
            {
              active: true,
              candidate_id: "20175032189",
              committee_id: "20175032188",
              committee_name: "Barlock For Governor",
              full_name: "Stephen Barlock",
              id: 351,
              image: "http://msantray.fatcow.com/governor_photos/steve_barlock.metro.jpg",
              last_name: "Barlock",
              party: "Republican",
              website: "https://www.barlockforgovernor.com/"}
          ]
        }
        )
      }));
  });
  it('should return a candidates object', async() => {
    const fetch = await initialCandidatesFetch();
    const mockCandidatesArray = [
      {
        active: true,
        candidate_id: "20175032046",
        committee_id: "20175032028",
        committee_name: "Cary Kennedy For Governor",
        full_name: "Cary Kennedy",
        id: 361,
        image: "http://msantray.fatcow.com/governor_photos/cary_kennedy.jpeg",
        last_name: "Kennedy",
        party: "Democrat",
        website: "http://carykennedyforgovernor.com/"},
      {
        active: true,
        candidate_id: "20175032189",
        committee_id: "20175032188",
        committee_name: "Barlock For Governor",
        full_name: "Stephen Barlock",
        id: 351,
        image: "http://msantray.fatcow.com/governor_photos/steve_barlock.metro.jpg",
        last_name: "Barlock",
        party: "Republican",
        website: "https://www.barlockforgovernor.com/"}
    ]

    expect(fetch).toEqual(mockCandidatesArray);
  })
})