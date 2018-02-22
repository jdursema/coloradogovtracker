import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
import ContributionContainer from '../../Components/ContributionContainer/ContributionContainer.js'
import './CandidateDetails.css'

class CandidateDetails extends Component {
    constructor(props) {
    super(props)
  }


  // componentDidMount = async () => {
  //   if (!this.props.selectedCandidate.length) {
  //     this.setCandidateRoute()
  //   } 
  // }



setCandidateRoute = (async() => {
    const idArray = Object.values(this.props.match.params);
    const candidateId = idArray[0];
    const candidateData = await getSelectedCandidate(candidateId);
    if(candidateData) {
      this.props.setCandidate(candidateData);
    }
    
});


getCandidateInfo = () => {
  if(this.props.selectedCandidate.length) {
  return (
  <div> {this.props.selectedCandidate.name} </div>
  )
  } else {
    this.setCandidateRoute()
  }
}

render () {
  return (
    <div className = "candidate-details">  
        {this.getCandidateInfo()}
      <ContributionContainer
        contributions = {this.props.selectedCandidate.contributions} />
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