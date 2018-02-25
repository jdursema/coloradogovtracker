
// import d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesData from '../../data/states-data'
import statesDefaults from '../../data/states-defaults';
import {getStateTotals} from '../../Helper/helper'
import * as d3 from "d3";
import scale from 'd3';
// import { scaleLinear } from "d3-scale"; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Map.css'
// import * as scale from "d3-scale"
// let d3 = require('d3');
// import objectAssign from 'object-assign';

class DataMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      totals: []
    }
    this.datamap = null;
  }
  linearPalleteScale(value){
     const stateTotals = this.state.totals

    const dataValues = stateTotals.map(function(data) { return data.total });
    const minVal = Math.min(...dataValues);
    const maxVal = Math.max(...dataValues);
    
    let sortedArray = dataValues.sort((a, b) => a - b);
    let half = Math.floor(sortedArray.length/2)
    let medianVal;

    if(sortedArray.length % 2) {
      medianVal = sortedArray[half]
    } else {
      medianVal = (sortedArray[half-1] + sortedArray[half])/2
    }

    return d3.scale.linear().domain([minVal, medianVal, maxVal]).range(["#deebf7","#9ecae1", "#4292c6"])(value);
  }
  
  redducedData(){
    if (this.state.totals) {
    const stateTotals = this.state.totals
    const newData = stateTotals.reduce((object, data) => {
      object[data.state] = { value: data.total, fillColor: this.linearPalleteScale(data.total) };
      return object;
    }, {});
    return Object.assign({}, statesDefaults, newData);
    }
  }
renderMap(){
    return new Datamap({
      element: ReactDOM.findDOMNode(this),
      scope: 'usa',
      data: this.redducedData(),
      geographyConfig: {
        borderWidth: 0.5,
        highlightFillColor: '#FFCC80',
        popupTemplate: function(geography, data) {
          let formattedNumber = (data.value + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
            return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
          });
          if (data && data.value) {
            return '<div class="hoverinfo">' + geography.properties.name + ': ' +'<strong>' + '$' + formattedNumber + '</strong></div>';
          } else {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
          }
        }
      }
    });
  }
  currentScreenWidth(){
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
  }
  componentDidMount = async () => {
   let stateTotals = await getStateTotals()
   this.setState({totals: stateTotals})
   

   d3.select('#datamap-container')
    this.datamap = this.renderMap();
    window.addEventListener('resize', () => {
      const currentScreenWidth = this.currentScreenWidth();
      if (this.currentScreenWidth() > 600) {
        d3.select('svg').remove();
        this.datamap = this.renderMap();
      }
      else if (this.currentScreenWidth() <= 600) {
        d3.select('svg').remove();
        this.datamap = this.renderMap();
      }
    });
  }

  componentWillUnmount(){
    d3.select('svg').remove();
  }
  render() {
    return (

      <div id="datamap-container"></div>
    );
  }
}

const mapStateToProps = state => ({
  stateTotals: state.stateTotals
})

export default withRouter(connect(mapStateToProps, null)(DataMap));

// DataMap.propTypes = {
//     regionData: React.PropTypes.array.isRequired
// };
