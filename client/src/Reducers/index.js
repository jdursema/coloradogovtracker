import { combineReducers } from 'redux';
import candidateReducer from './candidate-reducer';
import selectedCandidateReducer from './selected-candidate-reducer';
import contributionsReducer from './contribution-reducer.js';


const rootReducer = combineReducers({
  candidates: candidateReducer,
  contributions: contributionsReducer,
  selectedCandidate: selectedCandidateReducer
});

export default rootReducer;