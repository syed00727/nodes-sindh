import React, { Component } from 'react';
import { BroswerRouter, Route } from 'react-router-dom';
import './App.css';
import DetailGrid from './containers/detailGrid';
import NodeListContainer from './containers/nodes';
import NodeFullPage from './containers/nodeFullPage';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
        <div className="App">
          <div >
            <NodeListContainer />
            <Route exact path="/" component={DetailGrid} />
            <Route path="/node/:nodeId" component={NodeFullPage} />
          </div>
        </div>
    );
  }
}

export default App;
