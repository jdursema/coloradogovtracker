import React from 'react';
import '../../Components/Card/Card.css'

export const CandidateCard = (props) => {
 
  return (
  <div className = "card">
    <div className = "card-head">
     <img className="candidate-card-img" src={`${props.info.image}`} alt= {`${props.info.name}`} />
     <div className = "card-head-text">
        <h3>{props.info.name}</h3>
        <p>{props.info.party}</p>
      </div>
    </div>

   
    <p>{props.info.contributionTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
    <p>{props.info.expenditureTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
    <p>{props.info.contributionNum}</p>
  </div>
  )
}

export default CandidateCard