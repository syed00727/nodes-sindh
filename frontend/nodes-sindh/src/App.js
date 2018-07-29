import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NodeListContainer from './containers/nodes';
import DetailContainer from './containers/detail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to my App. No styling has been done yet. This is the Raw structure</h2>
        </div>
        <div className="App-intro">
        <NodeListContainer/>
        <DetailContainer/>
        </div>
      </div>
    );
  }
}

export default App;
