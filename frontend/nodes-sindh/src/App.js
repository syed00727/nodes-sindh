import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import './App.css';
import DetailGrid from './containers/detailGrid';
import NodeListContainer from './containers/nodes';


class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <div >
          <NodeListContainer />
          <DetailGrid />
        </div>
      </div>
    );
  }
}

export default App;
