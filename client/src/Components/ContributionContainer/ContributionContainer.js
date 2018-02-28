import React, { Component } from 'react';
import Card from '../Card/Card.js';
import './ContributionContainer.css';
import PropTypes from 'prop-types';



class ContributionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyDisplayed: [],
      active: 1
    }
  }

componentWillMount() {
  if(this.props.contributions){
     const sortedContributions = this.props.contributions.sort((a, b) => {
      return b.contribution_amount - a.contribution_amount;
    });
    this.setState({currentlyDisplayed:sortedContributions})
  }
}

componentWillReceiveProps(nextProps) {
  if(this.props !== nextProps) {
 
     const sortedContributions = nextProps.contributions.sort((a, b) => {
      return b.contribution_amount - a.contribution_amount;
    });
    this.setState({currentlyDisplayed: sortedContributions})
  }
}


  toggleActive = (position) => {
    if (this.state.active === position) {
      this.setState({active : null })
      console.log(this.state)
    } else {
      this.setState({active: position})
    }
  }

  activeClass = (position) => {
    if(this.state.active === position) {
      return 'filter-button active'
    } return 'filter-button'
  }

  searchContributors = (event) => {
    let contributions = this.props.contributions;
    let searchValue = event.toUpperCase();
    let contributionFilter = contributions.filter(contribution => contribution.donor_last.toUpperCase().includes(searchValue) ||
     contribution.donor_occupation.toUpperCase().includes(searchValue) ||
      contribution.donor_employer.toUpperCase().includes(searchValue) ||
      contribution.donor_first.toUpperCase().includes(searchValue) ||
      contribution.donor_state.toUpperCase().includes(searchValue))
    this.setState({currentlyDisplayed: contributionFilter})
  
  }

    sortHighContributions = (position) => {
    const sortedContributions = this.state.currentlyDisplayed.sort((a, b) => {
      return b.contribution_amount - a.contribution_amount;
    });
    this.setState({currentlyDisplayed: sortedContributions});
    this.toggleActive(position)
  
  }

  sortLowContributions = (position) => {
     const sortedContributions = this.state.currentlyDisplayed.sort((a, b) => {
      return a.contribution_amount - b.contribution_amount;
    });
    this.setState({currentlyDisplayed: sortedContributions, active:position});
    this.toggleActive(position)
  }

  alphabetizContributors = (position) => {

    const alphabetizedContributors = this.state.currentlyDisplayed.sort((a, b) => {
      if(a.donor_last.split(' ')[0] === null) return 0;
      if (a.donor_last.split(' ')[0] < b.donor_last.split(' ')[0]) return -1;
      if (a.donor_last.split(' ')[0] > b.donor_last.split(' ')[0]) return 1;
      return 0;
    });

    this.setState({currentlyDisplayed: alphabetizedContributors});
    this.toggleActive(position)
    
  }

    deAlphabetizContributors = (position) => {
      const alphabetizedContributors = this.state.currentlyDisplayed.sort((a, b) => {
      
        if (a.donor_last.split(' ')[0] > b.donor_last.split(' ')[0]) return -1;
        if (a.donor_last.split(' ')[0] < b.donor_last.split(' ')[0]) return 1;
          return 0;
      });

      this.setState({currentlyDisplayed: alphabetizedContributors});
      this.toggleActive(position)
    }


  mapContributions = (contributions, index) => {
    if(contributions) {
      

      const contributionMap = contributions.map((contribution, index) => {
        return (
          <Card 
            key = {contribution.index}
            id = {contribution.id}
            amount = {contribution.contribution_amount}
            firstName = {contribution.donor_first}
            lastName = {contribution.donor_last}
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
          <button className= {this.activeClass(1)} onClick = {(event) => this.sortHighContributions(1)}>Highest Contributions</button>
           <button className= {this.activeClass(2)} onClick = {(event) =>this.sortLowContributions(2)}>Lowest Contributions</button> 
          <button className= {this.activeClass(3)}onClick = {(event) => this.alphabetizContributors(3)}> Donors A to Z </button>
          <button className= {this.activeClass(4)} onClick = {(event)=> this.deAlphabetizContributors(4)}> Donors Z to A </button> 
          
            <input 
              className = "filter-search"
              onChange = {event => this.searchContributors(event.target.value)}
              type = "text"
              placeholder = "Search Contributors" />
          
        </div>
         <h3 className="center instructions"> Click on the card to see donor details </h3> 
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

ContributionContainer.propTypes = {
  contributions: PropTypes.array
}