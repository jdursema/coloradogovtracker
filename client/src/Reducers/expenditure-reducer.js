const expendituresReducer = (state = [], action) => {
  switch (action.type) {
    case'ADD_EXPENDITURES':
      return  action.expenditures;
    default:
      return state
  }
}

export default expendituresReducer