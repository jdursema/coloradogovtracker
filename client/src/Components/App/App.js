import React, { Component } from 'react';
import './App.css';
import CandidatesBar from '../../Containers/CandidatesBar/CandidatesBar';
import CandidateDetails from '../../Containers/CandidateDetails/CandidateDetails';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {initialCandidatesFetch, getAllContributions} from '../../Helper/helper';
import * as actions from '../../Actions/';
import DataMap from '../../Containers/Map/Map'


// import { VictoryBar } from 'victory';



export class App extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
  
    const contributionData = await getAllContributions();
    const candidateData = await initialCandidatesFetch();


    this.props.handleCandidates(candidateData);
    this.props.handleContributions(contributionData);
  }


  render () {
    return (

      <div className="App">
        <Route exact path = '/' component = {CandidatesBar} />
    
        <Route path = '/candidates/:id' render = {({match}) => {
          const candidateObject = this.props.candidates;
          const {id} = match.params;

          const candidateDetail = 
          Object.keys(candidateObject).find(candidate => candidateObject[candidate].committee_id === id);
        
          return <CandidateDetails />;
          
        }} />
   
     <div className="datamap-outer-container">
      <DataMap />
      </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  candidates: state.candidates
})

const mapDispatchToProps = dispatch => {
  return {
    handleCandidates: candidates => {
      dispatch(actions.addCandidatesToStore(candidates))
    },
    handleContributions: contributions => {
      dispatch(actions.addContributionsToStore(contributions))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
