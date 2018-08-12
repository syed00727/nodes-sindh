import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNodeHistory } from '../actions/nodes'
import { CircularProgress } from '@material-ui/core';

class NodeFullPage extends Component {


    componentDidMount() {
        console.log('updated')
        this.props.fetchNodeHistory(this.props.match.params.nodeId)
    }
    render() {
        // if (this.props.history === null) {
        //     return <CircularProgress />
        // }
        console.log(this.props)
        return <div>
            <span> Total records {this.props.history !== null ? this.props.history.length : 'empty'}</span>
            This is node {this.props.match.params.nodeId} detail
            <button onClick={() => this.props.fetchNodeHistory(this.props.match.params.nodeId)}> Fetch and Check </button>
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