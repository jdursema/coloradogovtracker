import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
// import { connect } from 'react-redux';
// import { initialCandidatesFetch } from '../../Actions';
import './CandidateDetails.css'

class CandidateDetails extends Component {
    constructor(props) {
    super(props);
  }




setCandidateRoute = (async() => {
    const idArray = Object.values(this.props.match.params);
    const candidateId = idArray[0];
    const candidateData = await getSelectedCandidate(candidateId);
    this.props.setCandidate(candidateData);
  });

getCandidateInfo = () => {
  if (this.props.candidates.selectedCandidate[0]) {
  let candidate = this.props.candidates.selectedCandidate[0]
  return (
    <div>
      <h1> {candidate.full_name} </h1>
      <img src={candidate.image} /> 
    </div>
  )
  } else {
    this.setCandidateRoute()
  }
}



render () {
  return (

    <div className = "candidate-details">  
     {this.getCandidateInfo()}
    </div>
  )
}
}

const mapStateToProps = state => ({
  candidates: state.candidates
})

const mapDispatchToProps = dispatch => {
  return {
    setCandidate: candidate => {
      dispatch(actions.setSelectedCandidate(candidate))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CandidateDetails));

// export default CandidateDetails;