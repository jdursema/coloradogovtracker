  const stateTotalReducer = (state = [], action) => {
  switch (action.type) {
    case'ADD_STATE_TOTALS':
      return  action.stateTotals;
    default:
    return state
  }
}

export default stateTotalReducer