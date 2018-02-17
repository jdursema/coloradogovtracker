import React, { Component } from 'react';
import './App.css';
import CandidatesBar from '../../Containers/CandidatesBar/CandidatesBar'
import CandidateDetails from '../../Containers/CandidateDetails/CandidateDetails'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {initialCandidatesFetch }from '../../Helper/helper';
import * as actions from '../../Actions/';



export class App extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
    const candidateData = await initialCandidatesFetch();
    this.props.handleCandidates(candidateData);
  }

   // <header>
        //   Colorado Governor Tracker
        // </header>
        //  <CandidatesBar/>

  render () {
    return (

      <div className="App">
      <Route exact path = '/' component = {CandidatesBar} />
      <Route path = '/candidates/:id' render = {({match}) => {
        const candidateObject = this.props.candidates.candidates;
        const {id} = match.params;

        const candidateDetail = 
          Object.keys(candidateObject).find(candidate => candidateObject[candidate].committee_id === id);
        
        return <CandidateDetails />;
          }} />
   
     
      </div>
    )
  }

}

const mapStateToProps = state => ({
  candidates: state.candidates
})

const mapDispatchToProps = dispatch => {
  return {
    handleCandidates: candidates => {
      dispatch(actions.addCandidatesToStore(candidates))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
