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
    super(props)
    this.state = {
      candidate: {}
    }
  }

setCandidateRoute = (async() => {
    const idArray = Object.values(this.props.match.params);
    const candidateId = idArray[0];
    const candidateData = await getSelectedCandidate(candidateId);
    this.props.setCandidate(candidateData);
});

getCandidateInfo = (candidate) => {
  return (
    <div>
      <h1> {candidate.name} </h1>
      <img src={candidate.image} /> 
    </div>
  )
  
}

 componentWillReceiveProps(nextProps) {
 
    this.setState({candidate:nextProps.info})
    console.log(this.state.candidate)
  
    
  }


render () {
  return (

    <div className = "candidate-details">  
    <p> hi </p>
    </div>
  )
}
}

const mapStateToProps = state => ({
  selectedCandidate: state.selectedCandidate,
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