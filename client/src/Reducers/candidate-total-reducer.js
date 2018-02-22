const candidateTotalReducer = (state = [], action) => {
  switch (action.type) {
    case'ADD_CANDIDATE_TOTALS':
      return  action.totals;
    default:
      return state
  }
}

export default candidateTotalReducer