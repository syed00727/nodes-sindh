import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNodeHistory } from '../actions/nodes'
import { CircularProgress } from '@material-ui/core';
import { LineSeries, XAxis, YAxis, XYPlot, VerticalGridLines, HorizontalGridLines } from 'react-vis'

const data = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 }
];

class NodeFullPage extends Component {

    constructor(props) {
        super(props)
        this.transformData = this.transformData.bind(this)
    }

    componentDidMount() {
        this.props.fetchNodeHistory(this.props.match.params.nodeId)
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
        if (this.props.history === null) {
            return <CircularProgress />
        }
        return <div>
            <span> Total records {this.props.history !== null ? this.props.history.length : 'empty'}</span>

            <XYPlot height={500} width={900}>
                <XAxis />
                <YAxis />
                <LineSeries data={this.props.history.map((idx,i) => {
                    return {
                        x: i,
                        y: idx.Voltage
                    }
                })}  curve={'curveMonotoneX'} />
            </XYPlot>
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