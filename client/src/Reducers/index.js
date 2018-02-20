import { combineReducers } from 'redux';
import candidateReducer from './candidate-reducer';
import selectedCandidateReducer from './selected-candidate-reducer';
import contributionsReducer from './contribution-reducer.js';
import expendituresReducer from './expenditure-reducer';


const rootReducer = combineReducers({
  candidates: candidateReducer,
  contributions: contributionsReducer,
  selctedCandidate: selectedCandidateReducer,
  expenditures: expendituresReducer
});

export default rootReducer;