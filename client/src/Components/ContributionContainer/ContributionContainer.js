import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
import Card from '../Card/Card.js'


class ContributionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm:'',
      currentlyDisplayed: []
    }
  }


componentWillReceiveProps(nextProps) {
  this.setState({currentlyDisplayed: this.props.contributions})
}

  searchContributors = (event) => {
    console.log(event)
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
            city = {contribution.donor_city}
            state = {contribution.donor_state}
            zip = {contribution.donor_zip}
            date = {contribution.contribution_date}
            employer = {contribution.donor_employer}
            occupation = {contribution.donor_occupation}
            contributionType = {contribution.contribution_type} />
        )
      })
        return contributionMap;
    }
  }

  render () {

    return (
      <div className = "contribution-container">

         <div className = "search-bar">
          <input 
            className = "search-field"
            onChange = {event => this.searchContributors(event.target.value)}
            type = "text"
            placeholder = "Search Contributors" />
        </div>
         <div> {this.mapContributions(this.state.currentlyDisplayed)}</div> 
      </div>
    )
  }
}

export default (ContributionContainer)