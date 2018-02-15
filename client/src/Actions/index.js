export const initialCandidatesFetch = () => async (dispatch) => {
  const initialFetch = await fetch('/api/v1/candidates')
  const fetchResponse = await initialFetch.json()
  dispatch(addCandidatesToStore(fetchResponse.candidates))
}

export const addCandidatesToStore = (candidatesArray) => ({
  type: 'ADD_CANDIDATES',
  candidatesArray
})