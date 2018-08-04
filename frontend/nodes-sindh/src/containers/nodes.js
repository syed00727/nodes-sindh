import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes, fetchNodeDetail } from '../actions/nodes';
import { AppBar, CircularProgress, withStyles, Select } from '@material-ui/core';

const styles = {
    root: { margin: '3px', padding: '3px', display: 'grid', gridTemplateColumns: '10% 10% 80%' ,gridGap : '5px 15px' }
}

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
        const { nodes, classes } = this.props;

        return <div>
            <AppBar color='secondary' position='static' className={classes.root}>
                <div>Nodes </div>
                {nodes === null ? <CircularProgress /> :
                    <select onChange={this.updateChoice}>
                        {
                            this.props.nodes.sort().map(i => {
                                return <option key={`node_id_${i}`}>{i}</option>
                            })
                        }
                    </select>
                }
                <div> The styling is under development. Ignore hiccups </div>
            </AppBar>
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

export default withStyles(styles)(NodeListContainer)