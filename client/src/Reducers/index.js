import { combineReducers } from 'redux';
import candidateReducer from './candidate-reducer';
import selectedCandidateReducer from './selected-candidate-reducer';
import contributionsReducer from './contribution-reducer.js';
import stateTotalReducer from './state-total-reducer.js'
import expendituresReducer from './expenditure-reducer';
import candidateTotalsReducer from './candidate-total-reducer';



const rootReducer = combineReducers({
  candidates: candidateReducer,
  contributions: contributionsReducer,
  selectedCandidate: selectedCandidateReducer,
  stateTotals: stateTotalReducer,
  expenditures: expendituresReducer,
  candidateTotals: candidateTotalsReducer

});

export default rootReducer;