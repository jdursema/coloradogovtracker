import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialCandidatesFetch } from '../../Actions';
import './CandidatesBar.css'

export class CandidatesBar extends Component {

  async componentDidMount () {
    this.props.handleCandidates();
  }

    

  

  render() {
    const mappedCardidates = this.props.candidates.map((candidate) => {
      return <div className='candidate-img' style={{backgroundImage: `url(${candidate.image})`}}></div>
    })
    return (
      <div className='candidate-bar'>
        {mappedCardidates}
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