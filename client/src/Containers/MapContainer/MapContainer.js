import React, { Component } from 'react';
import DataMap from '../Map/Map'
import './MapContainer.css'


const MapContainer = () => {

 
    return (
      <div className = "map-container" id="container-map">
        <h1> Follow the money </h1>
        <h3> Contributions to the 2018 Colorado governor's race have come from every state </h3>
        <div className = "map-container-content">
          <div className = "map">
            <DataMap />
          </div>
          <div className = "map-totals">
            <h3 className = "fund-head"> Top Fundraising States </h3>
            <ul className = "top-states">
              <li> <span className="light">Colorado:</span> $5,579,829 </li>
              <li> <span className="light">California:</span> $345,014 </li>
              <li> <span className="light">New York:</span> $317,925</li>
              <li> <span className="light">Connecticut:</span> $142,720</li>
               <li> <span className="light">Massachussets:</span> $105,922</li>
            </ul>
            <span className = "small"> *Hover over map to see all totals </span>
          </div>
        </div>
         
      </div>
    )
}

export default MapContainer;