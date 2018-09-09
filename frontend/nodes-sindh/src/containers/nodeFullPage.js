import { CircularProgress, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../node_modules/react-vis/dist/style.css';
import { fetchNodeHistory } from '../actions/nodes';
import TimeSeries from '../presentational/TimeSeries';
import { grey } from '@material-ui/core/colors'
import PinStatus from '../presentational/pinStatus';

const style = {
    chart: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: grey[200],
        padding: 5,
        margin: 2
    }
}

class NodeFullPage extends Component {

    constructor(props) {
        super(props)
        this.transformData = this.transformData.bind(this)
    }

    componentDidMount() {
        // console.log('executed...', this.props.match.params.nodeId)
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
                    y: idx.BatteryVoltage
                }
            }
        )
    }

    currentInfo = (node, classes) => {
        if (node == null) {
            return <CircularProgress />
        }
        return (
            <div className={classes.topBar}>
                <span>Node {node.Id}</span>
                <span>Battery Voltage {Math.round(node.BatteryVoltage * 100) / 100} V</span>
                <span>Power Solar Input {Math.round(node.PowerSolarInput * 100) / 100} A</span>
                <span><span>Pin Status</span><span><PinStatus pinStatus={node.Status} ></PinStatus> </span> </span>
                <span>Last Ping {node.Ping}</span>
            </div>
        )
    }

    render() {
        const { history, classes, detail } = this.props;
        const nodeId = this.props.match.params.nodeId
        const node = detail.toJS()[nodeId]
        let historyData = history.get(parseInt(nodeId))
        if (history.size === 0 || historyData == null) {
            return <CircularProgress />
        }
        return (
            <div>
                {this.currentInfo(node, classes)}
                <div className={classes.chart}>

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
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        history: state.history,
        detail: state.detail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNodeHistory: id => dispatch(fetchNodeHistory(id))
    }
}

const NodeFullPageContainer = connect(mapStateToProps, mapDispatchToProps)(NodeFullPage)

export default withStyles(style)(NodeFullPageContainer)