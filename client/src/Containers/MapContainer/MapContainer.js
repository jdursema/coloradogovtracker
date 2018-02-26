import React, { Component } from 'react';
import DataMap from '../Map/Map'
import './MapContainer.css'

class MapContainer extends Component {
  constructor(props) {
    super(props);
    
  }
  render(){
    return (
      <div className = "map-container">
        <h1> Follow the money </h1>
        <h3> Contributions to the Colorado governor's 2018 race have come from every state </h3>
        <div className = "map-container-content">
          <div className = "map">
            <DataMap />
          </div>
          <div className = "map-totals">
            <h3 className = "fund-head"> Top Fundraising States </h3>
            <ul className = "top-states">
              <li> Colorado </li>
              <li> California </li>
              <li> New York </li>

            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MapContainer;