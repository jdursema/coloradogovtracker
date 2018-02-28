import { combineReducers } from 'redux';
import candidateReducer from './candidate-reducer';
import selectedCandidateReducer from './selected-candidate-reducer';
import candidateTotalsReducer from './candidate-total-reducer';



const rootReducer = combineReducers({
  candidates: candidateReducer,
  selectedCandidate: selectedCandidateReducer,
  candidateTotals: candidateTotalsReducer

});

export default rootReducer;