import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
import ContributionContainer from '../../Components/ContributionContainer/ContributionContainer.js'
import './CandidateDetails.css'
import { VictoryPie, VictoryChart } from 'victory';

class CandidateDetails extends Component {
    constructor(props) {
    super(props)
  }



setCandidateRoute = (async() => {
    const idArray = Object.values(this.props.match.params);
    const candidateId = idArray[0];
    const candidateData = await getSelectedCandidate(candidateId);
  
    if(candidateData) {
      this.props.setCandidate(candidateData);
    }
    
});


getCandidateInfo = () => {
  if(this.props.selectedCandidate.name) {
  return (

  <div> {this.props.selectedCandidate.name} </div>
  )
  } else {
    this.setCandidateRoute()
  }
}






render () {
  console.log(this.props.selectedCandidate.contributionTotal)
  return (
    <div className = "candidate-details">  
      <div className = 'charts'>
          <VictoryPie
          data={[
          { x: this.props.selectedCandidate.name, y: parseInt(this.props.selectedCandidate.contributionTotal) },
          { x: 'total', y: 7401324.15999997}
          ]}
          />

      </div>

        {this.getCandidateInfo()}
      { this.props.selectedCandidate.contributions &&
      <ContributionContainer
        contributions = {this.props.selectedCandidate.contributions} />
      }
      { ! this.props.selectedCandidate.contributions &&
        <p> This candidate has no recorded contributions </p>
      }
      

    </div>
  )
}
}

const mapStateToProps = state => ({
  selectedCandidate: state.selectedCandidate,
  candidates: state.candidates,
  candidateTotals: state.candidateTotals
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