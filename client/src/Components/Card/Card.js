import React from 'react';

export const Card = ({key, id, firstName, lastName, amount, city, state, zip, date, employer}) => {
  

 const checkEmpty = (name) => {
    let lowercase = name.toLowerCase();
    let correctCase = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
    return name === '' ? 'NON-ITEMIZED CONTRBUTION' : name;
  };

  const capitalize = (string) =>{
    let lowercase = string.toLowerCase()
    return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
  };

  const titleCase = (string) => {
  str = string.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
  }

 const formatDate = ( date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getUTCMonth()+1;
    const year = newDate.getFullYear();

    return month + '/' + day + '/' + year
  };


const label = (field, label) => {
  console.log(field)
  return field.length ? label : null;
};

  return (
    <div className = "contribution-card"> 
     <p><strong>{firstName} {checkEmpty(lastName)}</strong></p> 
     <p> ${amount} </p>
     <p> {formatDate(date)} </p>
     <p> {city} {state} {zip} </p>
     <p> <span className = "label"> {label(employer, 'Employer:')} </span>{titleCase(employer)}</p>


    </div>
  )
}

export default Card