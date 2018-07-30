import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes, fetchNodeDetail } from '../actions/nodes';

class NodeList extends Component {



    constructor(props) {
        super(props)
        this.state = {}
        this.updateChoice = this.updateChoice.bind(this)
    }

    componentDidUpdate = (prevProps) => {
        const { nodes } = this.props;

        if (nodes !== null && (prevProps.nodes === null || nodes.length !== prevProps.nodes.length)) {
            this.props.fetchDetail(nodes[0])
        }

    }

    updateChoice = (event) => {
        let nodeId = event.target.value;
        this.props.fetchDetail(nodeId)
    }
    render() {
        const { nodes } = this.props;
        if (nodes === null) {
            return <div>loading...</div>
        }
        return <div>
            <select onChange={this.updateChoice}>
                {
                    this.props.nodes.sort().map(i => {
                        return <option key={`node_id_${i}`}>{i}</option>
                    })
                }
            </select>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        nodes: state.nodes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshNodes: () => dispatch(fetchNodes()),
        fetchDetail: id => dispatch(fetchNodeDetail(id))
    }
}

const NodeListContainer = connect(
    mapStateToProps, mapDispatchToProps
)(NodeList)

export default NodeListContainer