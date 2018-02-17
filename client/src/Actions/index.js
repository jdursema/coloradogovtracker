export const addCandidatesToStore = (candidatesArray) => ({
  type: 'ADD_CANDIDATES',
  candidatesArray
})

export const setSelectedCandidate = (candidateObject) => ({
  type: 'SELECT_CANDIDATE',
  candidateObject
})