import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
import ContributionContainer from '../../Components/ContributionContainer/ContributionContainer.js'
import './CandidateDetails.css'
import Header from '../../Components/Header/Header.js'
import handshake from '../../images/handshake.png';

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
      <div class = "stat-details">
          <div className = "stat stat1">
        <div className = "icon-box icon1">
          <img src = {handshake} alt = "handshake" />
        </div>
        <div className = "numbers">
          <span className = "big-number">
            5,896
          </span>
          <span className = "number-description">
            Number of contributions reported
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