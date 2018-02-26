import React from 'react';
import './Home.css'
import trackerLogo from '../../images/gov_tracker_logo_dkblue-04.png'
const Home = () => {
  return (
    <div className = "header">
      <div className = "header-top">
        <img src = {trackerLogo} class = "tracker-logo" alt = 'logo' />
      </div>
      <div className = "header-main">
        <div className = "header-text">
          <h2> Learn about the 2018 Colorado Governor's Race </h2> 
          <ul className = "nav-list"> 
            <li className = "nav-item"> Track and compare candidates </li>
            <li className = "nav-item"> Search contributors </li> 
            <li className = "nav-item"> See where the money is coming from </li> 
          </ul>
          <div className = "button-row">
            <button className = "button nav-button"> Race Overview</button>
            <button className = "button nav-button"> Compare Candidates</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home; 