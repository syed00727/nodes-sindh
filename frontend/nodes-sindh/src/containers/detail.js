import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {


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

    }
}

const DetailContainer = connect(
    mapStateToProps, mapDispatchToProps
)(Detail)

export default DetailContainer