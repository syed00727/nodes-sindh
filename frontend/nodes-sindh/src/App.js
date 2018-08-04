import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NodeListContainer from './containers/nodes';
import DetailContainer from './containers/detail';
import { withStyles } from '@material-ui/core';

const styles = {
  detail: {
    margin: '3px',
    padding: '3px'
  }
}

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <div >
          <NodeListContainer />
          <DetailContainer className={classes.detail} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
