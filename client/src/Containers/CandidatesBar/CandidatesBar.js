import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { initialCandidatesFetch } from '../../h';
import { getSelectedCandidate, initialCandidatesFetch }from '../../Helper/helper';
import './CandidatesBar.css';
import * as actions from '../../Actions/';


export class CandidatesBar extends Component {

  componentDidMount = async () => {
    const candidateData = await initialCandidatesFetch();
    this.props.handleCandidates(candidateData);
  }

  selectCandidate = async (candidateId) => {
    const candidateData = await getSelectedCandidate(candidateId)
    this.props.setCandidate(candidateData)
  }

  render() {
    const mappedCandidates = this.props.candidates.candidates.map((candidate) => {
      return <div 
        className='candidate-img' 
        style={{backgroundImage: `url(${candidate.image})`}}
        onClick={() => this.selectCandidate(candidate.committee_id)}>
        </div>
    })
        
    return (
      <div className='candidate-bar'>
      {mappedCandidates}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  candidates: state.candidates
})

const mapDispatchToProps = dispatch => {
  return {
    handleCandidates: candidates => {
      dispatch(actions.addCandidatesToStore(candidates))
    },
    setCandidate: candidate => {
      dispatch(actions.setSelectedCandidate(candidate))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidatesBar);