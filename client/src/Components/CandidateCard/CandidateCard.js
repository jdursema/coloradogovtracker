import React from 'react';
import '../../Components/Card/Card.css';
import { Link, withRouter } from 'react-router-dom';
import { getSelectedCandidate }from '../../Helper/helper.js';
import { connect } from 'react-redux';
import * as actions from '../../Actions/index.js';

export const CandidateCard = (props) => {
 
   const selectCandidate = async(candidateId) => {
    const candidateData = await getSelectedCandidate(candidateId)
    props.setCandidate(candidateData)
  }

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
     <button className = "get-candidate-button" 
        onClick = {() => selectCandidate(props.info.candidateId)}>
       <Link className = 'candidate-link' to = {`/candidates/${props.info.candidateId}`}> 
      Learn more
       </Link>
    </button> 


    
  </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    setCandidate: candidate => {
      dispatch(actions.setSelectedCandidate(candidate))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CandidateCard));