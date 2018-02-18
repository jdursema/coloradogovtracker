

const selectedCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case'SELECT_CANDIDATE':
      return action.candidateObject
    default:
      return state
  }
};

export default selectedCandidateReducer