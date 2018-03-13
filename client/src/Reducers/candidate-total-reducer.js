const candidateTotalReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_CANDIDATE_TOTALS':
  console.log(action.totals)
    return  action.totals;
  default:
    return state;
  }
};

export default candidateTotalReducer;