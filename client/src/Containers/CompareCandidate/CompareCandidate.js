import React, { Component } from 'react';
import { connect } from 'react-redux';
import CandidateCard from '../../Components/CandidateCard/CandidateCard';

export class CompareCandidate extends Component {
  constructor (props) {
    super(props);
    this.state = {
      candidateTotals: [],
      searchResults: []
    }
  }


  componentWillReceiveProps (nextProps) {
    console.log(nextProps.candidates)
    if(nextProps.candidateTotals.length){
      const activeCandidates = nextProps.candidateTotals.filter(candidate => candidate.active === 'true')
      activeCandidates.map(candidate => {
        const foundCandidate = nextProps.candidates.find((candidateObj) => {
          candidateObj.committee_id
          === candidate.candidateId
        })
        console.log(foundCandidate)

      })

      this.setState({candidateTotals: activeCandidates}) 
    }
  }

  searchCandidates (event) {
    const searchRequest = (event.target.value).toUpperCase()
    const results = this.state.candidateTotals.filter((candidate)=>candidate.name.toUpperCase().includes(searchRequest));
    this.setState({searchResults: results})
  }

  filterByParty (event) {
    const results = this.state.candidateTotals.filter((candidate)=>candidate.party === event.target.name);
    this.setState({searchResults: results})
  }

  sortByHighestEarners () {
    const sortedCandidates = this.state.candidateTotals.sort((a, b) => {
      return b.contributionTotal - a.contributionTotal;
    });

    this.setState({searchResults: sortedCandidates})
  }

  viewAllCandidates () {
    this.setState({searchResults: []})
  }




  render() {

    let mappedCandidates
    if(this.state.searchResults.length){
      mappedCandidates = this.state.searchResults.map((candidate)=> {
      return <CandidateCard info = {candidate}/>})
    }else if(!this.state.searchResults.length &&this.state.candidateTotals.length){
      mappedCandidates = this.state.candidateTotals.map((candidate)=> {
        return <CandidateCard info = {candidate}/>
      })
    }



    
    return (
      <div>
        <h1>Compare Candidates</h1>
        <input placeholder = 'Search Candidates' onChange = {(event) => this.searchCandidates(event)}/>
        <button onClick = {(event) => this.filterByParty(event)} name = 'Democrat' >Democrats</button>
        <button onClick = {(event) => this.filterByParty(event)} name= 'Republican'>Republicans</button>
        <button onClick = {() => this.sortByHighestEarners()}>Highest Earnings</button>
        <button onClick = {() => this.viewAllCandidates()}>View All</button>
        <div class='candidate-container'>
        {mappedCandidates}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  candidateTotals : state.candidateTotals,
  candidates: state.candidates
})

export default connect(mapStateToProps, null)(CompareCandidate)