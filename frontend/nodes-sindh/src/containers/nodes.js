import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes } from '../actions/nodes';

class NodeList extends Component {

   
    render() {
        const {nodes} = this.props;
        if(nodes === null) {
            return <div>loading...</div>
        }
        return <div>
            <select>
                {
                    this.props.nodes.map(i => {
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
        refreshNodes: () => dispatch(fetchNodes())
    }
}

const NodeListContainer = connect(
    mapStateToProps, mapDispatchToProps
)(NodeList)

export default NodeListContainer