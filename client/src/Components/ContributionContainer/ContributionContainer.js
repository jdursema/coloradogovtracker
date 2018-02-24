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
      currentlyDisplayed: []
    }
  }


componentWillMount() {
  if(this.props.contributions){
    this.setState({currentlyDisplayed:this.props.contributions})
  }
}

componentWillReceiveProps(nextProps) {
  if(this.props != nextProps) {
    this.setState({currentlyDisplayed: nextProps.contributions})
  }
}

  searchContributors = (event) => {
    let contributions = this.props.contributions;
    let searchValue = event.toUpperCase();
    let contributionFilter = contributions.filter(contribution => contribution.donor_last.toUpperCase().includes(searchValue))
    console.log('filter', contributionFilter)
    this.setState({currentlyDisplayed: contributionFilter})
    console.log('state', this.state.currentlyDisplayed)
  }


// searchBills = (search) => {
//   let bills = this.props.lawmakers.bills;

//   let searchValue = search.toUpperCase();

//   let billFilter = bills.filter(bill => bill.billTitle.toUpperCase().includes(searchValue) || bill.action.signAction.toUpperCase().includes(searchValue) || bill.billTitleId.toUpperCase().includes(searchValue));
//   this.setState({currentlyDisplayed: billFilter});
// }

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