import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';


class ContributionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm:'',
      currentlyDisplayed: []
    }
  }



// componentWillMount() {

//   if(this.props.contributions.length) {
//     this.setState({currentlyDisplayed: this.props.contributions})
//   }
// }

componentWillReceiveProps(nextProps) {
  this.setState({currentlyDisplayed: this.props.contributions})

}

  mapContributions = (contributions, index) => {
   if(contributions) {
    const contributionMap = contributions.map((contribution, index) => {
      return (
        <div> {contribution.id}</div> 
      )
    })
    return contributionMap
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