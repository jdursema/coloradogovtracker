import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };


  render() {
    return (
      <div className="App">
        <header>
          Colorado Governer Tracker
        </header>
        <div className="candidates">

        </div>
      </div>
    );
  }
}

export default App;
