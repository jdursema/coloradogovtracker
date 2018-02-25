import React from 'react';

export const Card = ({id, firstName, lastName, amount, date, occupation}) => {
  

 const checkEmpty = (name) => {
    let lowercase = name.toLowerCase();
    let correctCase = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
    return name === '' ? 'NON-ITEMIZED CONTRIBUTION' : name;
  };

  const capitalize = (string) =>{
    let lowercase = string.toLowerCase()
    return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
  };

  const titleCase = (string) => {
  string = string.toLowerCase().split(' ');
  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1); 
  }
  return string.join(' ');
  }

 const formatDate = ( date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getUTCMonth()+1;
    const year = newDate.getFullYear();

    return month + '/' + day + '/' + year
  };

const label = (field, label) => {
  return field.length ? label : null;
};

const formatAmount = (amount) => {
  let formattedNumber = (amount + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
   return formattedNumber;
 
}


  return (
    <div className = "contribution-card"> 
     <p><strong>{firstName} {checkEmpty(lastName)}</strong></p> 
     <p> ${formatAmount(amount)} </p>

   


    </div>
  )
}

export default Card