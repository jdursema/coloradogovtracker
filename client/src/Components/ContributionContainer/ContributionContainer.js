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
            
             />
           
            
            
            
            
            
            
        )
      })
        return contributionMap;
    }
  }

  render () {

    return (
      <div className = "contribution-container">
         <div> {this.mapContributions(this.state.currentlyDisplayed)}</div> 
      </div>
    )
  }
}

export default (ContributionContainer)