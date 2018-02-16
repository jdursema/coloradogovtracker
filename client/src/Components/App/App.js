import React, { Component } from 'react';
import './App.css';
import CandidatesBar from '../../Containers/CandidatesBar/CandidatesBar'
import CandidateDetails from '../../Containers/CandidateDetails/CandidateDetails'
import { Route, withRouter } from 'react-router-dom';




export class App extends Component {
  constructor() {
    super();
  }


  render () {
    return (
      <div className="App">

        <header>
          Colorado Governor Tracker
        </header>
        <CandidatesBar/>
      </div>
    )
  }

}





export default App;
