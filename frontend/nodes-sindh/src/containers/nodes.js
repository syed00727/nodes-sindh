import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes, fetchNodeDetail } from '../actions/nodes';
import { AppBar, CircularProgress, withStyles, Select, Toolbar, Typography } from '@material-ui/core';

const styles = {
    
    typo: {
        color: 'white'
    }
}

class NodeList extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.updateChoice = this.updateChoice.bind(this)
    }

    // componentDidUpdate = (prevProps) => {
    //     const { nodes } = this.props;

    //     if (nodes !== null && (prevProps.nodes === null || nodes.length !== prevProps.nodes.length)) {
    //         this.props.fetchDetail(nodes[0])
    //     }

    // }

    updateChoice = (event) => {
        let nodeId = event.target.value;
        // this.props.fetchDetail(nodeId) //TODO: remove this 
    }
    render() {
        const { nodes, classes } = this.props;

        return <div>
            <AppBar color='secondary' position='static' >
                <Toolbar>
                    <Typography component='h4' variant='title' color='textPrimary' className={classes.typo}>
                        Power Management Unit for Smart Distribution and Consumption
                     </Typography>
                </Toolbar>
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
        // fetchDetail: id => dispatch(fetchNodeDetail(id))
    }
}

const NodeListContainer = connect(
    mapStateToProps, mapDispatchToProps
)(NodeList)

export default withStyles(styles)(NodeListContainer)