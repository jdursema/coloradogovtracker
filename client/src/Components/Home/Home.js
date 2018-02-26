import React from 'react';
import './Home.css'
import trackerLogo from '../../images/gov_tracker_logo_dkblue-04.png'
import Trophy from 'react-icons/lib/fa/trophy';
import Dollar from 'react-icons/lib/fa/dollar';
import User from 'react-icons/lib/fa/user'

const Home = () => {
  return (
    <div className = "home">
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
    <div className = "stat-bar">
      <div className = "stat stat1">
        <div className = "icon-box icon1">
          <Trophy />
        </div>
        <div className = "numbers">
          <span className = "big-number">
            5,896
          </span>
          <span className = "number-description">
            Number of contributions reported
          </span>
        </div>
      </div>
      <div className = "stat stat2">
        <div className = "icon-box icon2">
          <Dollar />
        </div>
        <div className = "numbers">
          <span className = "big-number">
            $5,567,678
          </span>
          <span className = "number-description">
            Total money raised
          </span>
        </div>
      </div>
      <div className = "stat stat3">
        <div className = "icon-box icon3">
          <User />
        </div>
         <div className = "numbers">
          <span className = "big-number">
            $345,678
          </span>
          <span className = "number-description">
            Average raised per candidate
          </span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home; 