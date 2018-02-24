import React from 'react';

export const CandidateCard = (props) => {
  console.log(
    props
  )
  return (
  <div>
    <p>{props.info.full_name}</p>
  </div>
  )
}

export default CandidateCard