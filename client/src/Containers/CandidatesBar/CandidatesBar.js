import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialCandidatesFetch } from '../../Actions';
import './CandidatesBar.css'

export class CandidatesBar extends Component {

  async componentDidMount () {
    this.props.handleCandidates();
    console.log(this.props.candidates.candidates)
  }

  selectCandidate = (candidate) => {
  console.log(candidate)
  }

  render() {
    const mappedCandidates = this.props.candidates.candidates.map((candidate) => {
      return <div 
        className='candidate-img' 
        style={{backgroundImage: `url(${candidate.image})`}}
        onClick={() => this.selectCandidate(candidate)}>
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

const mapDispatchToProps = dispatch => ({
  handleCandidates: () => dispatch(initialCandidatesFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(CandidatesBar);