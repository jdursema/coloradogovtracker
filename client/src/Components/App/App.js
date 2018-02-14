import React, { Component } from 'react';
import './App.css';
import CandidatesBar from '../../Containers/CandidatesBar/CandidatesBar'

const App = () => {
  return (
    <div className="App">
      <header>
        Colorado Governer Tracker
      </header>
      <CandidatesBar/>
    </div>
  );
}

export default App;
