
  const contributionsReducer = (state = [], action) => {
  switch (action.type) {
    case'ADD_CONTRIBUTIONS':
      return  action.contributions;
    default:
    return state
  }
}

export default contributionsReducer