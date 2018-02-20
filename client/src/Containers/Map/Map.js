
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesData from '../../data/states-data'
import statesDefaults from '../../data/states-defaults';
import * as d3 from "d3";
import './Map.css'
// import * as scale from "d3-scale"
// let d3 = require('d3');
// import objectAssign from 'object-assign';

export default class DataMap extends React.Component {
  constructor(props){
    super(props);
    this.datamap = null;
  }
  linearPalleteScale(value){
    const dataValues = statesData.map(function(data) { return data.value });
    const minVal = Math.min(...dataValues);
    const maxVal = Math.max(...dataValues);
    return d3.scaleLinear().domain([minVal, maxVal]).range(["#EFEFFF","#02386F"])(value);
  }
  redducedData(){
    const newData = statesData.reduce((object, data) => {
      object[data.code] = { value: data.value, fillColor: this.linearPalleteScale(data.value) };
      return object;
    }, {});
    return Object.assign({}, statesDefaults, newData);
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
          if (data && data.value) {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + ', ' + data.value + '</strong></div>';
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
  componentDidMount(){
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
  componentDidUpdate(){
    this.datamap.updateChoropleth(this.redducedData());
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


// DataMap.propTypes = {
//     regionData: React.PropTypes.array.isRequired
// };
