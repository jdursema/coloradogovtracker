import React from 'react';

export const CandidateCard = (props) => {
  return (
  <div>
    <p>{props.info.name}</p>
    <p>{props.info.party}</p>
    <p>{props.info.contributionTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
    <p>{props.info.expenditureTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
    <p>{props.info.contributionNum}</p>
  </div>
  )
}

export default CandidateCard