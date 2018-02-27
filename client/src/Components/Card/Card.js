import React, { Component } from 'react';
import { fetchIndividualContribution } from '../../Helper/helper';


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      contributionDetails:{}
    }
  }
  
  toggleDetails = (async(recordId) => {

    const cardDetails = await fetchIndividualContribution(recordId)
    this.setState({contributionDetails: cardDetails})
    this.setState({showDetails: !this.state.showDetails})
  })

  setContributionState = (cardDetails) => {
   
  }

  checkEmpty = (name) => {
    let lowercase = name.toLowerCase();
    let correctCase = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
    return name === '' ? 'NON-ITEMIZED CONTRIBUTION' : name;
  };

   capitalize = (string) =>{
    let lowercase = string.toLowerCase()
    return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
  };

   titleCase = (string) => {
  string = string.toLowerCase().split(' ');
  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1); 
  }
  return string.join(' ');
  }

  formatDate = ( date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getUTCMonth()+1;
    const year = newDate.getFullYear();

    return month + '/' + day + '/' + year
  };

 label = (field, label) => {
  return field.length ? label : null;
};

 formatAmount = (amount) => {
  let formattedNumber = (amount + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
   return formattedNumber;
 
}

  render () {
  const {id, firstName, lastName, amount, date, occupation, recordId, type} = this.props


  return (
    <div className = "contribution-card" onClick = {() => {this.toggleDetails(recordId)}}> 
     { 
      !this.state.showDetails &&
      <div className = "donation-side">
      <div className = "donor-row">
        <div className = "card-row-small-text">{this.label(lastName, 'DONOR')} </div>
        <div className = "card-row-medium-text">{firstName} {lastName}</div> 
      </div>
      <div className = "donation-money-row">
        <div className = "card-row-small-text">CONTRIBUTION</div>
       <div className = "card-row-big-number"> ${this.formatAmount(amount)} </div>
      </div>
      <div className = "donor-row">
          <div className = "card-row-small-text">CONTRIBUTION TYPE </div>
        <div className = "card-row-medium-text">{type}</div> 
      </div>
      </div>

     }
     {
      this.state.showDetails &&
      <div>
        <div className = "card-back-row">
          <div className = "card-row-small-text"> DONATION DATE </div>
          <div className = "card-row-medium-text">{this.formatDate(this.state.contributionDetails[0].contribution_date)} </div>
        </div>
          <div className = "card-back-row">
          <div className = "card-row-small-text"> DONOR ADDRESS </div>
          <div className = "card-row-medium-text">{this.state.contributionDetails[0].donor_city}, {this.state.contributionDetails[0].donor_state} {this.state.contributionDetails[0].donor_zip} </div>
        </div>
        <div className = "card-back-row">
          <div className = "card-row-small-text"> {this.label(this.state.contributionDetails[0].donor_employer, 'DONOR EMPLOYER:')} </div>
          <div className = "card-row-medium-text">{this.titleCase(this.state.contributionDetails[0].donor_employer)}</div>
        </div>
        <div className = "card-back-row">
          <div className = "card-row-small-text"> {this.label(this.state.contributionDetails[0].donor_occupation, 'DONOR OCCUPATION:')} </div>
          <div className = "card-row-medium-text">{this.titleCase(this.state.contributionDetails[0].donor_occupation)}</div>
        </div>
      
     
    
      </div>
     }

    
    </div>
  )
  }
}

export default Card