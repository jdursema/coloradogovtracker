import React, { Component } from 'react';
import './App.css';
import CandidateDetails from '../../Containers/CandidateDetails/CandidateDetails';
import CompareCandidate from '../../Containers/CompareCandidate/CompareCandidate'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {initialCandidatesFetch} from '../../Helper/helper';
import * as actions from '../../Actions/';
import DataMap from '../../Containers/Map/Map';
import BarGraph from '../../Containers/BarGraph/BarGraph';
import BubbleChart from '../BubbleChart/BubbleChart';
import Home from '../Home/Home';
import MapContainer from '../../Containers/MapContainer/MapContainer.js'
import Scrollchor from 'react-scrollchor';





export class App extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
    const candidateData = await initialCandidatesFetch();
    console.log(candidateData)
    this.props.handleCandidates(candidateData);

  };

           
  render () {
    return (

      <div className="App">
        <Route exact path = '/' component = {Home} />
        <Route exact path = '/' component = {MapContainer} />
       
        <Route exact path = '/' component = {BarGraph} />
        <Route exact path = '/' component = {CompareCandidate} />

        <Route path = '/candidates/:id' render = {({match}) => {
          const candidateObject = this.props.candidates;
          const {id} = match.params;

          const candidateDetail = 
          Object.keys(candidateObject).find(candidate => candidateObject[candidate].committee_id === id);
        
          return <CandidateDetails />;
          
        }} />

      
    
      </div>
    );
  }

}

const mapStateToProps = state => ({
  candidates: state.candidates,
  candidateTotals: state.candidateTotals
})

const mapDispatchToProps = dispatch => {
  return {
    handleCandidates: candidates => {
      dispatch(actions.addCandidatesToStore(candidates))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
