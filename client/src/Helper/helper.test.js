import React from 'react';
import Enzyme from 'enzyme';
import {initialCandidatesFetch, getCandidateContributions, getStateTotals, initialTotalsFetch, fetchIndividualContribution} from './helper';

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

describe('getCandidateContributions', () => {
  beforeEach(() => {
    window.fetch =
    jest.fn().mockImplementation(()=> 
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(
          {contributors:[
            {
              Jurisdiction:"STATEWIDE",
              candidate_name:"JARED S. POLIS",
              committee_id:"20175032139",
              committee_name:"POLIS FOR COLORADO",
              committee_type:"Candidate Committee",
              contribution_amount:"450000.00",
              contribution_date:"2017-12-15T07:00:00.000Z",
              contribution_type:"Monetary (Itemized)",
              donor_address:"1655 WALNUT ST",
              donor_city:"BOULDER",
              donor_employer:"",
              donor_first:"JARED",
              donor_last:"POLIS",
              donor_occupation:"",
              donor_state:"CO",
              donor_type:"Candidate",
              donor_zip:"80302",
              id:130276,
              record_id:"4684383"
            },
            {
              Jurisdiction:"STATEWIDE",
              candidate_name:"JARED S. POLIS",
              committee_id:"20175032139",
              committee_name:"POLIS FOR COLORADO",
              committee_type:"Candidate Committee",
              contribution_amount:"45.00",
              contribution_date:"2017-12-15T07:00:00.000Z",
              contribution_type:"Monetary (Itemized)",
              donor_address:"1655 WALNUT ST",
              donor_city:"BOULDER",
              donor_employer:"",
              donor_first:"JARED",
              donor_last:"POLIS",
              donor_occupation:"",
              donor_state:"CO",
              donor_type:"Candidate",
              donor_zip:"80302",
              id:130276,
              record_id:"4684383"
            }
          ]
        }
        )
      }));
  });
  it('should return a contributors object', async() => {
    const fetch = await getCandidateContributions(20175032139);
    const mockContributionsArray = [
      {
        Jurisdiction:"STATEWIDE",
        candidate_name:"JARED S. POLIS",
        committee_id:"20175032139",
        committee_name:"POLIS FOR COLORADO",
        committee_type:"Candidate Committee",
        contribution_amount:"450000.00",
        contribution_date:"2017-12-15T07:00:00.000Z",
        contribution_type:"Monetary (Itemized)",
        donor_address:"1655 WALNUT ST",
        donor_city:"BOULDER",
        donor_employer:"",
        donor_first:"JARED",
        donor_last:"POLIS",
        donor_occupation:"",
        donor_state:"CO",
        donor_type:"Candidate",
        donor_zip:"80302",
        id:130276,
        record_id:"4684383"
      },
      {
        Jurisdiction:"STATEWIDE",
        candidate_name:"JARED S. POLIS",
        committee_id:"20175032139",
        committee_name:"POLIS FOR COLORADO",
        committee_type:"Candidate Committee",
        contribution_amount:"45.00",
        contribution_date:"2017-12-15T07:00:00.000Z",
        contribution_type:"Monetary (Itemized)",
        donor_address:"1655 WALNUT ST",
        donor_city:"BOULDER",
        donor_employer:"",
        donor_first:"JARED",
        donor_last:"POLIS",
        donor_occupation:"",
        donor_state:"CO",
        donor_type:"Candidate",
        donor_zip:"80302",
        id:130276,
        record_id:"4684383"
      }
    ]

    expect(fetch).toEqual(mockContributionsArray);
  })
})



describe('getStateTotals', () => {
  beforeEach(() => {
    window.fetch =
    jest.fn().mockImplementation(()=> 
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(
          { state:
            [ { 
              id: 1,
              state: 'CO',
              total: "5579829.05"
            },
            {
              id: 2,
              state: 'CA',
              total: "345014.39"
            },
            {
              id: 3,
              state: 'NY',
              total: "317925.02"
            }
          ]
        }
        )
      }));
  });
  it('should return a contributors object', async() => {
    const fetch = await getStateTotals();
    const mockStateTotalsArray = [ { 
      id: 1,
      state: 'CO',
      total: "5579829.05"
    },
    {
      id: 2,
      state: 'CA',
      total: "345014.39"
    },
    {
      id: 3,
      state: 'NY',
      total: "317925.02"
    }
  ]
    expect(fetch).toEqual(mockStateTotalsArray);
  })
})


describe('initialTotalsFetch', () => {
  beforeEach(() => {
    window.fetch =
    jest.fn().mockImplementation(()=> 
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(
          {candidate: [
            {
              active: "true",
              avgContribution: "710.88",
              candidateId: "20165031883",
              contributionNum:983,
              contributionTotal:"698797.97",
              expenditureTotal:"462787.89",
              id:1,
              name:"Noel Ginsburg",
              party:"Democrat"},
            {
              active:"true",
              avgContribution: "71.88",
              candidateId: "20175031909",
              contributionNum:442,
              contributionTotal:"31769.59",
              expenditureTotal: "862857.18",
              id: 4,
              name:"Victor Mitchell",
              party:"Republican"}
          ]
        }
        )
      }));
  });
  it('should return a candidate object with candidates totals', async() => {
    const fetch = await initialTotalsFetch();
    const mockCandidateTotalsArray = [
      {
        active:"true",
        avgContribution: 710.88,
        candidateId: "20165031883",
        contributionNum:983,
        contributionTotal:698797.97,
        expenditureTotal:462787.89,
        id:1,
        name:"Noel Ginsburg",
        party:"Democrat"},
      {
        active:"true",
        avgContribution: 71.88,
        candidateId: "20175031909",
        contributionNum:442,
        contributionTotal:31769.59,
        expenditureTotal: 862857.18,
        id: 4,
        name:"Victor Mitchell",
        party:"Republican"}
    ]

    expect(fetch).toEqual(mockCandidateTotalsArray);
  })
})


describe('fetchIndividualContribution', () => {
  beforeEach(() => {
    window.fetch =
    jest.fn().mockImplementation(()=> 
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(
          {contributors: [
            {
              Jurisdiction:"STATEWIDE",
              candidate_name:"JARED S. POLIS",
              committee_id:"20175032139",
              committee_name:"POLIS FOR COLORADO",
              committee_type:"Candidate Committee",
              contribution_amount:"450000.00",
              contribution_date:"2017-12-15T07:00:00.000Z",
              contribution_type:"Monetary (Itemized)",
              donor_address:"1655 WALNUT ST",
              donor_city:"BOULDER",
              donor_employer:"",
              donor_first:"JARED",
              donor_last:"POLIS",
              donor_occupation:"",
              donor_state:"CO",
              donor_type:"Candidate",
              donor_zip:"80302",
              id:130276,
              record_id:"4684383"
            }
          ]
        }
        )
      }));
  });
  it('should return a candidate object with candidates totals', async() => {
    const fetch = await fetchIndividualContribution();
    const mockContributorResponse = [
      {
        Jurisdiction:"STATEWIDE",
        candidate_name:"JARED S. POLIS",
        committee_id:"20175032139",
        committee_name:"POLIS FOR COLORADO",
        committee_type:"Candidate Committee",
        contribution_amount:"450000.00",
        contribution_date:"2017-12-15T07:00:00.000Z",
        contribution_type:"Monetary (Itemized)",
        donor_address:"1655 WALNUT ST",
        donor_city:"BOULDER",
        donor_employer:"",
        donor_first:"JARED",
        donor_last:"POLIS",
        donor_occupation:"",
        donor_state:"CO",
        donor_type:"Candidate",
        donor_zip:"80302",
        id:130276,
        record_id:"4684383"
      }
    ]

    expect(fetch).toEqual(mockContributorResponse);
  })
})