
const defaultState = 
  {
    candidates: [],
    selectedCandidate: []
  };


const candidatesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_CANDIDATES':
      return { ...state,
      candidates: action.candidatesArray,
      selectedCandidate:''
    };

    case'SELECT_CANDIDATE':
    return { ...state,
      selectedCandidate:action.candidateObject
    }
  
    default:
    return state
  }
}

export default candidatesReducer