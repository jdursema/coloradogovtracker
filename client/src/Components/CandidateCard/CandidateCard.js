import React from 'react';
import '../../Components/Card/Card.css';
import { Link, withRouter } from 'react-router-dom';
import { getSelectedCandidate }from '../../Helper/helper.js';
import { connect } from 'react-redux';
import * as actions from '../../Actions/index.js';
import upArrow from '../../images/upArrow.png';
import downArrow from '../../images/downArrow.png';
import check from '../../images/checked-symbol.png';

export const CandidateCard = (props) => {
 
   const selectCandidate = async(candidateId) => {
    const candidateData = await getSelectedCandidate(candidateId)
    props.setCandidate(candidateData)
  }

  const partyColor = (party) => {
    if(party === 'Republican') {
      return '#a2000b'
    } else if (party === 'Democrat'){
      return '#184982'
    } else {
      return '#7b807b'
    }
  }

  const nameSplit = (name) => {
    const splitName = name.split(' ')
    return (
      <div className = 'name-div'>
      <h3 className = "candidate-first"> {splitName[0]}</h3>
      <h3 className = "candidate-last">{splitName[splitName.length-1]} </h3> 
      </div>
    )
  }

  return (
  <div className = "card">
    <div className = "card-head">
     <img className="candidate-card-img" src={props.info.image} alt= {props.info.name} />
     <div className = "card-head-text">
        {nameSplit(props.info.name)}
      </div>
    </div>

    <p className = "center party" style = {{color: partyColor(props.info.party)}}> <strong>{props.info.party}</strong></p>
    <div className = "card-row">
      <div className = "card-icon"> <img src = {upArrow} alt = "up Arrow" /> </div>
      <div className = "card-row-text">
        <div className = "card-row-big-text"> {props.info.contributionTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
        <div className = "card-row-small-text"> TOTAL CONTRIBUTIONS </div>
      </div>
    </div>
      <div className = "card-row">
        <div className = "card-icon"> <img src = {downArrow} alt = "down Arrow" /> </div>
        <div className = "card-row-text">
          <div className = "card-row-big-text"> {props.info.expenditureTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
          <div className = "card-row-small-text"> TOTAL EXPENDITURES </div>
        </div>
      </div>
      <div className = "card-row">
        <div className = "card-icon"> <img src = {check} alt = "check" /> </div>
        <div className = "card-row-text">
          <div className = "card-row-big-text"> {props.info.contributionNum}</div>
          <div className = "card-row-small-text"> NUMBER OF CONTRIBUTIONS </div>
        </div>
    </div>
     <button className = "get-candidate-button" 
        onClick = {() => selectCandidate(props.info.candidateId)}>
       <Link className = 'candidate-link' to = {`/candidates/${props.info.candidateId}`}> 
      See Contributors
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