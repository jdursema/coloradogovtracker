export const getSelectedCandidate = async (id) => {
  const candidateFetch = await fetch('/api/v1/candidates')
  const candidateResponse = await initialFetch.json()
  return candidateResponse
}