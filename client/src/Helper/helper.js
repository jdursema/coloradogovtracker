
export const initialCandidatesFetch = async () => {
  const initialFetch = await fetch('/api/v1/candidates')
  const fetchResponse = await initialFetch.json();
  return fetchResponse.candidates
}

export const getSelectedCandidate = async (id) => {
  const candidateFetch = await fetch(`/api/v1/candidates/${id}`)
  const candidateResponse = await candidateFetch.json()
  cleanCandidateInfo(candidateResponse.candidates)
  return candidateResponse.candidates
  // return cleanCandidateInfo(candidateResponse.candidates)
}

const cleanCandidateInfo = (candidate) => {


  // const contributionPromises = await getContributions(candidateObject.committee_id)
  return {
    id: candidate[0].committee_id,
    info: {
      name: candidate[0].full_name,
      lastName: candidate[0].last_name,
      image:candidate[0].image,
      party: candidate[0].party,
      website:candidate[0].website,
      active:candidate[0].active,
      committee: candidate[0].committee_name
    }
  }
}


export const getAllContributions = async () => {
  const initialFetch = await fetch ('/api/v1/contributions')
  const fetchResponse = await initialFetch.json();
  return fetchResponse.contributors;
}
