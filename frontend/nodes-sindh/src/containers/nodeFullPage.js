import { CircularProgress, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../node_modules/react-vis/dist/style.css';
import { fetchNodeHistory } from '../actions/nodes';
import TimeSeries from '../presentational/TimeSeries';


const style = {
    chart: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}

class NodeFullPage extends Component {

    constructor(props) {
        super(props)
        this.transformData = this.transformData.bind(this)
    }

    componentDidMount() {
        this.props.fetchNodeHistory(parseInt(this.props.match.params.nodeId))
    }

    transformData = history => {
        if (history === null) {
            console.log('null :( ')
            return [{ x: 1, y: 1 }]
        }
        history.map(
            idx => {
                return {
                    x: new Date(idx.Ping),
                    y: idx.Voltage
                }
            }
        )
    }

    render() {
        const { history, classes } = this.props;
        let historyData = history.get(parseInt(this.props.match.params.nodeId))
        if (history.size === 0) {
            return <CircularProgress />
        }
        return <div className={classes.chart}>
            <TimeSeries
                height={400} width={700}
                YTitle={`Voltage (V)`}
                data={historyData.map((idx) => {
                    return {
                        x: new Date(idx.Ping),
                        y: idx.Voltage
                    }
                })} />

            <TimeSeries
                stroke='orange'
                height={400} width={700}
                YTitle={`Current (A)`}
                data={historyData.map((idx) => {
                    return {
                        x: new Date(idx.Ping),
                        y: idx.Current
                    }
                })} />

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

export default withStyles(style)(NodeFullPageContainer)