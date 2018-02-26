
export const initialCandidatesFetch = async () => {
  try {
    const initialFetch = await fetch('/api/v1/candidates')
    const fetchResponse = await initialFetch.json();
    return fetchResponse.candidates
  } catch(error) {
    console.log(error)
  }
}

export const getSelectedCandidate = async (id) => {
  try {
    const candidateFetch = await fetch(`/api/v1/candidates/${id}`)
    const candidateResponse = await candidateFetch.json()
      return cleanCandidateInfo(candidateResponse.candidates)
  } catch (error) {
      console.log(error)
  }
}

const cleanCandidateInfo = (async(candidate) => {
 
  const contributionPromises = await getCandidateContributions(candidate[0].committee_id)

  // const contributionPromises = await getContributions(candidateObject.committee_id)
  return {
    id: candidate[0].committee_id,
    
      name: candidate[0].full_name,
      lastName: candidate[0].last_name,
      image:candidate[0].image,
      party: candidate[0].party,
      website:candidate[0].website,
      active:candidate[0].active,
      committee: candidate[0].committee_name,
   
    contributions: contributionPromises
  }
})


const getCandidateContributions = (async(candidateId) => {
  const contributionFetch = await fetch (`/api/v1/candidates/${candidateId}/contributions`)
  const contributionResponse = await contributionFetch.json()
  return contributionResponse.contributors
})

// const cleanCandidateContributions = (contributions) => {
//   return {

//   }
// }


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

export const getStateTotals = async() => {
  try {
    const stateFetch = await fetch ('/api/v1/state')
    const fetchResponse = await stateFetch.json();
    return fetchResponse.state

  } catch (error) {
    console.log(error)
  }
}


export const initialExpenditureFetch = async () => {
  const initialFetch = await fetch('/api/v1/expenditures');
  const fetchResponse = await initialFetch.json();
  const cleanResponse = await cleanExpenditures(fetchResponse.expenditures)
  return cleanResponse
}

const cleanExpenditures = async (expendituresArray) => {
  const organizedExpenditures = expendituresArray.reduce((acc, expenditure) => {
    if (!acc[expenditure.committee_id]){
      acc[expenditure.committee_id] = []
    }
    
    acc[expenditure.committee_id].push(expenditure)
    return acc
  }, {})
  const candidateIds = Object.keys(organizedExpenditures)
  const object = candidateIds.map((candidate) => {
    const candidateExpence = organizedExpenditures[candidate].reduce((acc, expenditure, index) => {
      // acc += parseFloat(contribution.contribution_amount).toFixed(2)
      acc += Math.floor(expenditure.expenditure_amt* 100) / 100
      return acc
    }, 0)
  
    return { committee_id: candidate,
    candidate_name: organizedExpenditures[candidate][0].candidate_name,
    candidate_expences: candidateExpence}
  })

  return object

}

export const initialTotalsFetch = async () => {
  const initialFetch = await fetch('/api/v1/totals')
  const fetchResponse = await initialFetch.json()

  const cleanData = fetchResponse.candidate.map((candidate) => {
    return {...candidate, 
      expenditureTotal: Math.floor(candidate.expenditureTotal*100)/100, contributionTotal: Math.floor(candidate.contributionTotal*100)/100, contributionNum: Math.floor(candidate.contributionNum*100)/100, avgContribution: Math.floor(candidate.avgContribution*100)/100}
  })
  return cleanData
}


export const fetchIndividualContribution = async(contributionId) => {
  const initialFetch = await fetch (`/api/v1/contributions/${contributionId}`)
  const fetchResponse = await initialFetch.json()
  return fetchResponse.contributors
}

