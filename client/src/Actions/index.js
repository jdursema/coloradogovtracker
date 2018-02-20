export const addCandidatesToStore = (candidatesArray) => ({
  type: 'ADD_CANDIDATES',
  candidatesArray
})

export const setSelectedCandidate = (candidateObject) => ({
  type: 'SELECT_CANDIDATE',
  candidateObject
})

export const addContributionsToStore = (contributions) => ({
  type: 'ADD_CONTRIBUTIONS',
  contributions
})

export const addExpendituresToStore = (expenditures) => ({
  type: 'ADD_EXPENDITURES',
  expenditures
})