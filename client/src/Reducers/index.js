import { combineReducers } from 'redux';
import candidateReducer from './candidate-reducer';


const rootReducer = combineReducers({
  candidates: candidateReducer
});

export default rootReducer;