import * as actions from './index.js'
import candidates from '../mockdata/mockStore.js';
import selectedCandidate from '../mockdata/mockStore.js';
import candidateTotals from '../mockdata/mockStore.js'

describe('Actions', () => {
  it('should create an ADD_CANDIDATES action', () => {
    const candidatesArray = [candidates];
    const expected = {
      type: 'ADD_CANDIDATES',
      candidatesArray
    };
    expect(actions.addCandidatesToStore(candidatesArray)).toEqual(expected)
  })
  it('should create a SELECT_CANDIDATES action', () => {
    const candidateObject = selectedCandidate
    const expected = {
      type: 'SELECT_CANDIDATE',
      candidateObject
    };
    expect(actions.setSelectedCandidate(candidateObject)).toEqual(expected)
  })
  it('should create ADD_CANDIDATE_TOTAL action', () => {
    const totals = candidateTotals
    const expected = {
      type: 'ADD_CANDIDATE_TOTALS',
      totals
    };
    expect(actions.addCandidateTotalsToStore(totals)).toEqual(expected)
  })
})