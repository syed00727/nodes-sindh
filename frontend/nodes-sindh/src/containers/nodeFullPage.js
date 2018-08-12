import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNodeHistory } from '../actions/nodes'
import { CircularProgress } from '@material-ui/core';

class NodeFullPage extends Component {

    componentDidUpdate(){
        console.log('updated')
    }
    render() {
        if (this.props.history === null) {
            return <CircularProgress />
        }
        return <div>
            <span> Total records {this.props.history.size}</span>
            This is node {this.props.match.params.nodeId} detail
        </div>
    }
}


const mapStateToProps = state => {
    return {
        history: state.history
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNodeHistory: id => dispatch(fetchNodeHistory(id))
    }
}

const NodeFullPageContainer = connect(mapStateToProps, mapDispatchToProps)(NodeFullPage)

export default NodeFullPageContainer