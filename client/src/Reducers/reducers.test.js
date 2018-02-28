import * as actions from '../Actions/index.js';
import candidates from '../mockdata/mockStore.js';
import selectedCandidate from '../mockdata/mockStore.js';
import candidateTotals from '../mockdata/mockStore.js';
import candidatesReducer from './candidate-reducer.js';
import candidateTotalReducer from './candidate-total-reducer.js';
import selectedCandidateReducer from './selected-candidate-reducer.js';

describe('candidates reducer', () => {
  it('Should return the default store', () => {
    const expected = [];
    expect(candidatesReducer(undefined, {})).toEqual(expected);
  });
  it('Should return a new store with the candidates', () => {
    const candidatesArray = [candidates];
    const expected = [candidates];
    expect(candidatesReducer(undefined, actions.addCandidatesToStore(candidatesArray))).toEqual(expected);
  });
});

describe('candidate total reducer', () => {
  it('Should return the default store', () => {
    const expected = [];
    expect(candidateTotalReducer(undefined, {})).toEqual(expected);
  });
  it('Should return a new store with the candidate totals', () => {
    const totals = candidateTotals;
    const expected = candidateTotals;
    expect(candidateTotalReducer(undefined, actions.addCandidateTotalsToStore(totals))).toEqual(expected);
  });
});

describe('selected candidate reducer', () => {
  it('should return the default store', () => {
    const expected = {};
    expect(selectedCandidateReducer(undefined, {})).toEqual(expected);
  });
  it('Should return a new store with the selected candidate', () => {
    const candidateObject = selectedCandidate;
    const expected = selectedCandidate;
    expect(selectedCandidateReducer(undefined, actions.setSelectedCandidate(candidateObject))).toEqual(expected);
  });
});

