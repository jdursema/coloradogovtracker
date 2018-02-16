
export const initialCandidatesFetch = async () => {
  const initialFetch = await fetch('/api/v1/candidates')
  const fetchResponse = await initialFetch.json();
  return fetchResponse.candidates
}

export const getSelectedCandidate = async (id) => {
  const candidateFetch = await fetch(`/api/v1/candidates/${id}`)
  const candidateResponse = await candidateFetch.json()
  return candidateResponse.candidates
}