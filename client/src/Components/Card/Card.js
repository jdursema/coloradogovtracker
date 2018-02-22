import React from 'react';

export const Card = ({key, id, firstName, lastName, amount}) => {
  return (
    <div className = "contribution-card"> 
     <h3>{firstName} {lastName} </h3> 
     <p> {amount} </p>
    </div>
  )
}

export default Card