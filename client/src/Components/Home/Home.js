import React from 'react';
import './Home.css';
import handshake from '../../images/handshake.png';
import dollar from '../../images/dollar-symbol.png';
import profile from '../../images/profile.png';
import Header from '../Header/Header.js';
import Scrollchor from 'react-scrollchor';
       

const Home = () => {
  return (
    <div className = "home" id = "home-id">
      <div className = "header">
        <div className = "header-top">
          <Header />
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
              <Scrollchor to= '#container-map' className="button nav-button"> Race Overview </Scrollchor>
              <Scrollchor to= '#candidate-compare' className="button nav-button"> Compare Candidates</Scrollchor>


            </div>
          </div>
        </div>
      </div>
      <div className = "stat-bar">
        <div className = "stat stat1">
          <div className = "icon-box icon1">
            <img src = {handshake} alt = "handshake" />
          </div>
          <div className = "numbers">
            <span className = "big-number">
            26,686
            </span>
            <span className = "number-description">
            Contributions reported
            </span>
          </div>
        </div>
        <div className = "stat stat2">
          <div className = "icon-box icon2">
            <img src = {dollar} alt = "dollar" />
          </div>
          <div className = "numbers">
            <span className = "big-number">
            $7,401,324.16
            </span>
            <span className = "number-description">
            Total money raised
            </span>
          </div>
        </div>
        <div className = "stat stat3">
          <div className = "icon-box icon3">
            <img src = {profile} alt = "profile-icon" />

        
          </div>
          <div className = "numbers">
            <span className = "big-number">
            $321,796.70
            </span>
            <span className = "number-description">
            Average raised per candidate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 