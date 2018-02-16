
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
  
    default:
    return state
  }
}

export default candidatesReducer