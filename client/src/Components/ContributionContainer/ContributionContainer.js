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
  console.log(this.state.currentlyDisplayed)

}

  mapContributions = (contributions, index) => {
    if(contributions) {
      const contributionMap = contributions.map((contribution, index) => {
        return (
          <Card 
            key = {index}
            id = {contribution.id}
            amount = {contribution.contribution_amount}
            firstName = {contribution.donor_first}
            lastName = {contribution.donor_last} />
            
            
        )
      })
        return contributionMap;
    }
  }

  render () {

    return (
      <div className = "contribution-container">
         <p> {this.mapContributions(this.state.currentlyDisplayed)}</p> 
      </div>
    )
  }
}

export default (ContributionContainer)