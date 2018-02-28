

const candidatesReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_CANDIDATES':
    return action.candidatesArray;
  default:
    return state;
  }
};

export default candidatesReducer;