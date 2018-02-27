import React, { Component } from 'react';
import './App.css';
import CandidateDetails from '../../Containers/CandidateDetails/CandidateDetails';
import CompareCandidate from '../../Containers/CompareCandidate/CompareCandidate'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {initialCandidatesFetch, getAllContributions, initialExpenditureFetch} from '../../Helper/helper';
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
 
    const contributionData = await getAllContributions();

    if(!localStorage.contributions){
      const contributionData = await getAllContributions();
      localStorage.setItem('contributions', JSON.stringify(contributionData))
      this.props.handleContributions(contributionData);
    } else {
      const storageContributionData = JSON.parse(localStorage.getItem('contributions')) 
      this.props.handleContributions(storageContributionData);
    }

    if(!localStorage.expenditures){
      const expenditureData = await initialExpenditureFetch();
      localStorage.setItem('expenditures', JSON.stringify(expenditureData))
      this.props.handleExpenditures(expenditureData);
    } else {
      const storageExpenditureData = JSON.parse(localStorage.getItem('expenditures'))
      this.props.handleExpenditures(storageExpenditureData);
    }
    // const contributionData = await getAllContributions();
    const candidateData = await initialCandidatesFetch();
  

 
    this.props.handleCandidates(candidateData);
  
  }

    //<Route exact path = '/' component = {DataMap} />
           
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
    },
    handleContributions: contributions => {
      dispatch(actions.addContributionsToStore(contributions))
    },
    handleExpenditures: expenditures => {
      dispatch(actions.addExpendituresToStore(expenditures))

    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
