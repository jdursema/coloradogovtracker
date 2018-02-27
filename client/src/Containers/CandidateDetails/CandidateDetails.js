import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
import ContributionContainer from '../../Components/ContributionContainer/ContributionContainer.js'
import './CandidateDetails.css'

import Header from '../../Components/Header/Header.js'
import handshake from '../../images/handshake.png';
import dollar from '../../images/dollar-symbol.png';
import profile from '../../images/profile.png';
import { VictoryPie } from 'victory';


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
    <div className = "candidate-info">
      <img class="details-image"src = {this.props.selectedCandidate.image} />
      <p> {this.props.selectedCandidate.party}</p>
      <div class = "stat-details">
          <div className = "details-stat details-stat1">
            <div className = "details-icon">
              <img src = {dollar} alt = "dollar sign" />
            </div>
            <div className = "numbers">
              <span className = "big-number">
                5,896
              </span>
              <span className = "number-description">
                Total money raised
              </span>
          </div>
      </div>
      <div className = "details-stat details-stat1">
            <div className = "details-icon">
              <img src = {handshake} alt = "handshake" />
            </div>
            <div className = "numbers">
              <span className = "big-number">
                5,896
              </span>
              <span className = "number-description">
                Contributions reported
              </span>
          </div>
      </div>
      <div className = "details-stat details-stat1">
            <div className = "details-icon">
              <img src = {profile} alt = "handshake" />
            </div>
            <div className = "numbers">
              <span className = "big-number">
                5,896
              </span>
              <span className = "number-description">
                Average contribution 
              </span>
          </div>
      </div>

      </div>
    </div>
     
  )
  } else {
    this.setCandidateRoute()
  }
}


candidateTotal = () => { 
  const foundCandidate = this.props.candidateTotals.find((candidate) => {
    return this.props.selectedCandidate.id === candidate.candidateId
  }); 
}



render () {
  window.scrollTo(0, 0);
  return (

    <div className = "candidate-details">
    <div className = "details-head">
    
      <Header />
      <div className = "name-div">
       <h1>{this.props.selectedCandidate.name}</h1>
       </div>
    </div>

    <div className = "details-content">
      <div className = "candidate-breakdown">
    <div className = "candidate-details">  
      <div className = 'charts'>

          <VictoryPie
          data={[
          { x: this.props.selectedCandidate.name, y: this.candidateTotal() },
          { x: 'total', y: 7401324.15999997}
          ]}
          />

      </div>


        {this.getCandidateInfo()}
      </div>
      { this.props.selectedCandidate.contributions &&
      <ContributionContainer
        contributions = {this.props.selectedCandidate.contributions} />
      }
      { !this.props.selectedCandidate.contributions &&
        <p> This candidate has no recorded contributions </p>
      }

    </div>
    

   
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