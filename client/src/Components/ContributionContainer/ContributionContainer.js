import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
import Card from '../Card/Card.js'
import './ContributionContainer.css'



class ContributionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyDisplayed: []
    }
  }


componentWillMount() {
  if(this.props.contributions){
     const sortedContributions = this.props.contributions.sort((a, b) => {
      return b.contribution_amount - a.contribution_amount;
    });
    this.setState({currentlyDisplayed:this.props.contributions})
  }
}

componentWillReceiveProps(nextProps) {
  if(this.props != nextProps) {
 
     const sortedContributions = nextProps.contributions.sort((a, b) => {
      return b.contribution_amount - a.contribution_amount;
    });
    this.setState({currentlyDisplayed: nextProps.contributions})
  }
}

  searchContributors = (event) => {
    let contributions = this.props.contributions;
    let searchValue = event.toUpperCase();
    let contributionFilter = contributions.filter(contribution => contribution.donor_last.toUpperCase().includes(searchValue))
  
    this.setState({currentlyDisplayed: contributionFilter})
  
  }

    sortHighContributions = () => {
    const sortedContributions = this.state.currentlyDisplayed.sort((a, b) => {
      return b.contribution_amount - a.contribution_amount;
    });
    this.setState({currentlyDisplayed: sortedContributions});
  }

  sortLowContributions = () => {
     const sortedContributions = this.state.currentlyDisplayed.sort((a, b) => {
      return a.contribution_amount - b.contribution_amount;
    });
    this.setState({currentlyDisplayed: sortedContributions});
  }

  alphabetizContributors = () => {

    const alphabetizedContributors = this.state.currentlyDisplayed.sort((a, b) => {
      if(a.donor_last.split(' ')[0] === null) return 0;
      if (a.donor_last.split(' ')[0] < b.donor_last.split(' ')[0]) return -1;
      if (a.donor_last.split(' ')[0] > b.donor_last.split(' ')[0]) return 1;
      return 0;
    });

    this.setState({currentlyDisplayed: alphabetizedContributors});
    
  }

    deAlphabetizContributors = () => {
      const alphabetizedContributors = this.state.currentlyDisplayed.sort((a, b) => {
      
        if (a.donor_last.split(' ')[0] > b.donor_last.split(' ')[0]) return -1;
        if (a.donor_last.split(' ')[0] < b.donor_last.split(' ')[0]) return 1;
          return 0;
      });

      this.setState({currentlyDisplayed: alphabetizedContributors});
    }


  mapContributions = (contributions, index) => {
    if(contributions) {
      

      const contributionMap = contributions.map((contribution, index) => {
        return (
          <Card 
            id = {contribution.id}
            amount = {contribution.contribution_amount}
            firstName = {contribution.donor_first}
            lastName = {contribution.donor_last}
            amount = {contribution.contribution_amount}
            recordId = {contribution.record_id}
            date = {contribution.contribution_date}
            type = {contribution.contribution_type}
            occupation = {contribution.donor_occupation}
            />
        )
      })
        return contributionMap;
    }
  }

  render () {
    return (
      <div className = "contribution-container">
        <h2 className = "center"> Contributions </h2>
        <div className = "candidate-sort-bar center">
          <button className= "filter-button" onClick = {this.sortHighContributions}>Highest Contributions</button>
          <button className= "filter-button" onClick = {this.sortLowContributions}>Lowest Contributions</button>
          <button className= "filter-button" onClick = {this.alphabetizContributors}> Donors A to Z </button>
          <button className= "filter-button" onClick = {this.deAlphabetizContributors}> Donors Z to A </button> 
           
            <input 
              className = "filter-search"
              onChange = {event => this.searchContributors(event.target.value)}
              type = "text"
              placeholder = "Search Contributors" />
          
        </div>
         <h3 class="center"> Click on the card to see more donor details </h3> 
        <div className = 'contribution-card-container'>

          <div className = 'contribution-card-holder'>
            {this.mapContributions(this.state.currentlyDisplayed)}
          </div> 
        </div>
      </div>
    )
  }
}

export default (ContributionContainer)