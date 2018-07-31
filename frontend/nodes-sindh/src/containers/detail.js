import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendCommand, fetchNodeDetail } from '../actions/nodes'
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

class Detail extends Component {

    constructor(props) {
        super(props)
        this.toggleNodePower = this.toggleNodePower.bind(this)
        this.state = {}
    }
    toggleNodePower = () => {
        console.log('received')
        let powerBit = this.props.detail.Power === 1 ? 0 : 1
        let command = `${powerBit}00000000`
        this.props.sendCommand(command, this.props.detail.Id)
    }

    

    render() {
        const { detail } = this.props;
        if (detail === null) {
            return <div>loading...</div>
        }
        return <div>
            <div>
                <h2> Node Id: {detail.Id}</h2>
                <p> Power: {detail.Power}</p>
                <p>Voltage: {detail.Voltage}</p>
                <p>Current: {detail.Current}</p>
                <p>Last Seen {detail.Ping}</p>
                <p>Pin Status (Dec) : {detail.Status}</p>
                <button onClick={this.toggleNodePower}>Toggle Power</button>
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        detail: state.detail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendCommand: (command, node) => dispatch(sendCommand(command, node)),
        fetchDetail: id => dispatch(fetchNodeDetail(id))

    }
}

const DetailContainer = connect(
    mapStateToProps, mapDispatchToProps
)(Detail)

export default DetailContainer