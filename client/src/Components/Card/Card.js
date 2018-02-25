import React, { Component } from 'react';


class Card extends Component {
  constructor(props) {
    super(props);
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
  const {id, firstName, lastName, amount, date, occupation} = this.props
  return (
    <div className = "contribution-card" onClick = {this.toggleDetails}> 
     <p><strong>{firstName} {this.checkEmpty(lastName)}</strong></p> 
     <p> ${this.formatAmount(amount)} </p>
    </div>
  )
  }
}

export default Card