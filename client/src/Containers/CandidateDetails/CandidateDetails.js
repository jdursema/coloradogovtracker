import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
import './CandidateDetails.css'

class CandidateDetails extends Component {
    constructor(props) {
    super(props)
  }


  componentDidMount = async () => {
    if (!this.props.selectedCandidate.length) {
      console.log('no selected candidate')
      this.setCandidateRoute()
    } else {
      console.log('something else')
    }
 

  }



setCandidateRoute = (async() => {
  console.log('set candidate route hitting')
    const idArray = Object.values(this.props.match.params);
    const candidateId = idArray[0];
    const candidateData = await getSelectedCandidate(candidateId);
    this.props.setCandidate(candidateData);
});



getCandidateInfo = () => {
  return (
  <div> {this.props.selectedCandidate.name} </div>
  )
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