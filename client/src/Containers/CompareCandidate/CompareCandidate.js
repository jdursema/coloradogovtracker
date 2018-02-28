import React, { Component } from 'react';
import { connect } from 'react-redux';
import CandidateCard from '../../Components/CandidateCard/CandidateCard';
import './CompareCandidate.css';

export class CompareCandidate extends Component {
  constructor (props) {
    super(props);
    this.state = {
      candidateTotals: [],
      searchResults: [],
      active: 3
    };
  }


  componentWillReceiveProps (nextProps) {
    if (nextProps.candidateTotals.length){
      const activeCandidates = nextProps.candidateTotals.filter(candidate => candidate.active === 'true');
      activeCandidates.map(candidate => {
        const foundCandidate = nextProps.candidates.find((candidateObj) => {
          candidateObj.committee_id
          === candidate.candidateId;
        });

      });
      this.setState({candidateTotals: activeCandidates}); 
      this.sortByHighestEarners();
    }
    this.setState({active:3});
  }



  searchCandidates (event) {
    const searchRequest = (event.target.value).toUpperCase();
    const results = this.state.candidateTotals.filter((candidate)=>candidate.name.toUpperCase().includes(searchRequest));
    this.setState({searchResults: results});
  }

  filterByParty (event, position) {
    const results = this.state.candidateTotals.filter((candidate)=>candidate.party === event.target.name);
    this.setState({searchResults: results});
    this.toggleActive(position);
  }

  sortByHighestEarners (position) {
    const sortedCandidates = this.state.candidateTotals.sort((a, b) => {
      return b.contributionTotal - a.contributionTotal;
    });

    this.setState({searchResults: sortedCandidates});
    this.toggleActive(position);
  }

  viewAllCandidates (position) {
    this.setState({searchResults: []});
    this.toggleActive(position);
  }

    toggleActive = (position) => {
      if (this.state.active === position) {
        this.setState({active : null });
     
      } else {
        this.setState({active: position});
      }
    }

  activeClass = (position) => {
    if (this.state.active === position) {
      return 'filter-button active';
    } return 'filter-button';
  }



  render() {

    let mappedCandidates;
    if (this.state.searchResults.length){
      mappedCandidates = this.state.searchResults.map((candidate)=> {
        return <CandidateCard info = {candidate}/>;
      });
    } else if (!this.state.searchResults.length &&this.state.candidateTotals.length){
      mappedCandidates = this.state.candidateTotals.map((candidate)=> {
        return <CandidateCard info = {candidate}/>;
      });
    }

    return (
      <div className = "compare" id="candidate-compare">
        <h1 className = "center">Compare Candidates</h1>
        <div className = "candidate-sort-bar center">
          <input className = "filter-search"placeholder = 'Search Candidates' onChange = {(event) => this.searchCandidates(event)}/>
          

          <button className= {this.activeClass(1)} onClick = {(event) => this.filterByParty(event, 1)} name = 'Democrat' >Democrats</button>
          <button className= {this.activeClass(2)} onClick = {(event) => this.filterByParty(event, 2)} name= 'Republican'>Republicans</button>
          <button className={this.activeClass(3)} onClick = {(event) => this.sortByHighestEarners(3)}>Highest Earnings</button>
          <button className= {this.activeClass(4)}  onClick = {(event) => this.viewAllCandidates(4)}>All Active Candidates</button>
        </div>
        <div className='card-container'>
          <div className  = 'card-holder'>
            {mappedCandidates}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candidateTotals : state.candidateTotals,
  candidates: state.candidates
});

export default connect(mapStateToProps, null)(CompareCandidate);