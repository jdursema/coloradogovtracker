import React, { Component } from 'react';
import './App.css';
import CandidateDetails from '../../Containers/CandidateDetails/CandidateDetails';
import CompareCandidate from '../../Containers/CompareCandidate/CompareCandidate';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {initialCandidatesFetch} from '../../Helper/helper';
import * as actions from '../../Actions/';
import BarGraph from '../../Containers/BarGraph/BarGraph';
import Home from '../Home/Home';
import MapContainer from '../../Containers/MapContainer/MapContainer.js';
import PropTypes from 'prop-types';




export class App extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
    try{
      const candidateData = await initialCandidatesFetch();
    this.props.handleCandidates(candidateData);
    } catch (error) {
      throw error;
    }
    

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
          /* eslint-disable */
          Object.keys(candidateObject).find(candidate => candidateObject[candidate].committee_id === id);
        /* eslint-enable */
          return <CandidateDetails />;
          
        }} />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  candidates: state.candidates,
  candidateTotals: state.candidateTotals
});

const mapDispatchToProps = dispatch => {
  return {
    handleCandidates: candidates => {
      dispatch(actions.addCandidatesToStore(candidates));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  handleCandidates: PropTypes.func,
  candidates: PropTypes.array
};