import { CardContent, Typography, withStyles, CircularProgress, Switch } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodeDetail, sendCommand } from '../actions/nodes';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import grey from '@material-ui/core/colors/grey'
import PinStatus from '../presentational/pinStatus'
import { Link } from 'react-router-dom'

const Voltage = (props) => {

    const detail = props.detail;
    let isAboveLimit = detail.VoltageLimit.Valid && detail.VoltageLimit.Float64 < detail.Voltage
    return <span>
       Battery Voltage: <span style={{ color: isAboveLimit ? red[900] : green[900] }} > {Math.round(detail.BatteryVoltage * 100) / 100} V </span>
        <span style={{ fontSize: 11, color: grey[800] }} > {detail.VoltageLimit.Valid ? `limit: ${(Math.round(detail.VoltageLimit.Float64 * 100) / 100)} V` : ``}
        </span>
    </span>
}

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
 const formatFloat = num => {
     return Math.round(num * 100 / 100)
 } 

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
                           <Link to={`/node/${detail.Id}`} >Node {detail.Id}</Link> 
                        </Typography>
                        <Switch className={classes.switch} checked={detail.Power} onChange={this.toggleNodePower} color="primary" />
                    </div>
                    <Typography color="textSecondary">
                        Last Ping {date.fromNow()}
                    </Typography>

                </div>

                <CardContent className={classes.cardContent}>
                    <p><Voltage detail={detail} /></p>
                    <p>Solar Input: {Math.round(detail.PowerSolarInput * 100) / 100} W</p>
                    <p>Battery to Grid  :{formatFloat(detail.PowerBatteryToGrid)} W</p>
                    <p>Grid to Battery  : {formatFloat(detail.PowerGridToBattery)} W</p>
                    <p> Battery to Load : {formatFloat(detail.PowerBatteryToLoad)} W</p>
                    <p> Grid Voltage : {formatFloat(detail.GridVoltage)} W</p>
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
    mapStateToProps, mapDispatchToProps
)(Detail)

export default withStyles(styles)(DetailContainer)