import { CardContent, Typography, withStyles, CircularProgress, Switch } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodeDetail, sendCommand } from '../actions/nodes';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import PinStatus from '../presentational/pinStatus'

dayjs.extend(relativeTime)
const styles = {
    detail: {
        margin: 1.5,
        padding: 3
    },
    card: {
        minWidth: 275,
        width: 300,
        padding: 10
    },
    dot: {
        height: 15,
        width: 15,
        borderRadius: '50%',
        display: 'inline-block'

    },
    cardheader: {
        display: 'grid',
        gridTemplateColumns: '10% 40% 50%',
        alignItems: 'center'
    },
    node: {
        placeSelf: 'start center'
    },
    cardContent: {
        textAlign: 'center'
    },
    switch: {
        placeSelf: 'center end'
    }

};


class Detail extends Component {

    constructor(props) {
        super(props)
        this.toggleNodePower = this.toggleNodePower.bind(this)
        this.state = {}
    }
    toggleNodePower = () => {
        let powerBit = this.props.detail.Power === 1 ? 0 : 1
        let command = `${powerBit}00000000`
        this.props.sendCommand(command, this.props.detail.Id)
    }



    render() {
        const { detail, classes } = this.props;
        if (detail === null) {
            return (
                <CircularProgress />
            )
        }
        const date = dayjs(detail.Ping)
        const powerStatus = detail.Power === 0 ? red[500] : green[500]
        return <div className={classes.detail}>
            <Card className={classes.card}>
                <div >
                    <div className={classes.cardheader}>
                        <span style={{ ...styles.dot, backgroundColor: powerStatus }} ></span>
                        <Typography variant="headline" component="h2">
                            Node {detail.Id}
                        </Typography>
                        <Switch className={classes.switch} checked={detail.Power} onChange={this.toggleNodePower} color="primary" />
                    </div>
                    <Typography color="textSecondary">
                        Last Ping {date.fromNow()}
                    </Typography>

                </div>

                <CardContent className={classes.cardContent}>
                    <p>Voltage: {Math.round(detail.Voltage * 100) / 100} V</p>
                    <p>Current: {Math.round(detail.Current * 100) / 100} A</p>
                    <PinStatus pinStatus={detail.Status} />
                </CardContent>
            </Card>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendCommand: (command, node) => dispatch(sendCommand(command, node)),
        fetchDetail: id => dispatch(fetchNodeDetail(id))

    }
}

const DetailContainer = connect(
    mapStateToProps , mapDispatchToProps
)(Detail)

export default withStyles(styles)(DetailContainer)