export const initialCandidatesFetch = async () => {
  try {
    const initialFetch = await fetch('/api/v1/candidates');
    const fetchResponse = await initialFetch.json();
    return fetchResponse.candidates;
  } catch (error) {
    throw error;
  }
};


export const getSelectedCandidate = async (id) => {
  try {
    const candidateFetch = await fetch(`/api/v1/candidates/${id}`);
    const candidateResponse = await candidateFetch.json();
    const cleanData = await cleanCandidateInfo(candidateResponse.candidates);
    const candidateTotalFetch = await fetch(`/api/v1/totals/${id}`);
    const candidateTotalsResponse = await candidateTotalFetch.json();
    return Object.assign({}, cleanData, candidateTotalsResponse.candidate[0]);


  } catch (error) {
    throw error;
  }
};

const cleanCandidateInfo = (async(candidate) => {
 
  const contributionPromises = await getCandidateContributions(candidate[0].committee_id);

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
  };
});


export const getCandidateContributions = async (candidateId) => {

  const contributionFetch = await fetch (`/api/v1/candidates/${candidateId}/contributions`);
  const contributionResponse = await contributionFetch.json();
  return contributionResponse.contribution;

};


export const getStateTotals = async() => {
  try {
    const stateFetch = await fetch ('/api/v1/state');
    const fetchResponse = await stateFetch.json();
    return fetchResponse.state;

  } catch (error) {
    throw error;
  }
};



export const initialTotalsFetch = async () => {
  try {
    const initialFetch = await fetch('/api/v1/totals');
    const fetchResponse = await initialFetch.json();

    const cleanData = fetchResponse.candidate.map((candidate) => {
      return {...candidate, 
        expenditureTotal: Math.floor(candidate.expenditureTotal*100)/100,
        contributionTotal: Math.floor(candidate.contributionTotal*100)/100,
        contributionNum: Math.floor(candidate.contributionNum*100)/100, 
        avgContribution: Math.floor(candidate.avgContribution*100)/100};
    });
    return cleanData;
  } catch (error) {
    throw error;
  }
};


export const fetchIndividualContribution = async(contributionId) => {
  const initialFetch = await fetch (`/api/v1/contributions/${contributionId}`);
  const fetchResponse = await initialFetch.json();
  return fetchResponse.contributors;
};

