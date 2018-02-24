import React, { Component } from 'react';
import { connect } from 'react-redux';
import CandidateCard from '../../Components/CandidateCard/CandidateCard';

export class CompareCandidate extends Component {
  constructor () {
    super();
    this.state = {
      candidates: []
    }
  }


  componentWillReceiveProps(nextProps) {

    if(nextProps.candidates.length){

      const activeCandidates = nextProps.candidates.filter(candidate => candidate.active === true)
      this.setState({candidates: activeCandidates}) 
    }
    
  }




  render() {
    let mappedCandidates

    if(this.state.candidates.length){
      mappedCandidates = this.state.candidates.map((candidate)=> {
        return <CandidateCard info = {candidate}/>
      })
    }
    
    return (
      <div>
        <h3>Gubernatorial Candidates</h3>
        <input placeholder = 'Search Candidates'/>
        <div class='candidate-container'>
        {mappedCandidates}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  candidates : state.candidates,
})

export default connect(mapStateToProps, null)(CompareCandidate)