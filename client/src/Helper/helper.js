
export const initialCandidatesFetch = async () => {
  const initialFetch = await fetch('/api/v1/candidates')
  const fetchResponse = await initialFetch.json();
  return fetchResponse.candidates
}

export const getSelectedCandidate = async (id) => {
  const candidateFetch = await fetch(`/api/v1/candidates/${id}`)
  const candidateResponse = await candidateFetch.json()
  return cleanCandidateInfo(candidateResponse.candidates)
  // return candidateResponse.candidates
  // return cleanCandidateInfo(candidateResponse.candidates)
}

const cleanCandidateInfo = (async(candidate) => {
  const contributionPromises = await getCandidateContributions(candidate[0].committee_id)

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
    },
    contributions: contributionPromises
  }
})


const getCandidateContributions = (async(candidateId) => {
  const contributionFetch = await fetch (`/api/v1/candidates/${candidateId}/contributions`)
  const contributionResponse = await contributionFetch.json()
  return contributionResponse.contributors
})


export const getAllContributions = async () => {
  const initialFetch = await fetch ('/api/v1/contributions')
  const fetchResponse = await initialFetch.json();
  const cleanResponse = await cleanContribution(fetchResponse.contributors)
  return cleanResponse
}

const cleanContribution = async (contribtionsArray) => {
  const organizedContributions = contribtionsArray.reduce((acc, contribution) => {
    if(!acc[contribution.committee_id]){
      acc[contribution.committee_id] = []
    }
    
    acc[contribution.committee_id].push(contribution)
    return acc
  }, {})
  const candidateIds = Object.keys(organizedContributions)
  console.log(88.01)
  const object = candidateIds.map((candidate) => {
    const candidateCash = organizedContributions[candidate].reduce((acc, contribution, index) => {
      // acc += parseFloat(contribution.contribution_amount).toFixed(2)
      acc += Math.floor(contribution.contribution_amount* 100) / 100
      return acc
    }, 0)
  
    return { committee_id: candidate,
    candidate_name: organizedContributions[candidate][0].candidate_name,
    candidate_contributions: organizedContributions[candidate].length,
    candidate_cash: candidateCash}
  })

  return object

}

