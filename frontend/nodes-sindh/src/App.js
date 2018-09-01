import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DetailGrid from './containers/detailGrid';
import NodeFullPage from './containers/nodeFullPage';
import NodeListContainer from './containers/nodes';
import { connect } from 'react-redux'
import { updateNodeDetail } from './actions/nodes'

class App extends Component {

  componentDidMount() {
    const ws = new WebSocket('wss://nodes-sindh.herokuapp.com/ws')
    ws.onmessage = webSocketRes =>
      this.props.updateNodeDetail(JSON.parse(webSocketRes.data))


  }

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

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    updateNodeDetail: detail => dispatch(updateNodeDetail(detail))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
