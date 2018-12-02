import { CardContent, Typography, withStyles, CircularProgress, Switch, Button, Dialog } from '@material-ui/core';
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
import CommandPanel from '../presentational/commandPanel';
import Block from '../presentational/numericBlock'
import ValuesGrid from '../presentational/valuesGrid';

// const Voltage = (props) => {

//     const detail = props.detail;
//     let isAboveLimit = detail.VoltageLimit.Valid && detail.VoltageLimit.Float64 < detail.Voltage
//     return <span>
//         Battery Voltage: <span style={{ color: isAboveLimit ? red[900] : green[900] }} > {Math.round(detail.BatteryVoltage * 100) / 100} V </span>
//         <span style={{ fontSize: 11, color: grey[800] }} > {detail.VoltageLimit.Valid ? `limit: ${(Math.round(detail.VoltageLimit.Float64 * 100) / 100)} V` : ``}
//         </span>
//     </span>
// }

dayjs.extend(relativeTime)
const styles = {
    detail: {
        margin: 1.5,
        padding: 3
    },
    card: {
        padding: 10,
        maxWidth: 500
    },
    dot: {
        height: 15,
        width: 15,
        borderRadius: '50%',
        display: 'inline-block'

    },
    cardheader: {
        display: 'flex',
        flexDirection: 'row',
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
    },
    dialog: {
        maxWidth: 800
    },
    title: {
        flexGrow: 1
    }

};
const formatFloat = num => {
    return Math.round(num * 100 / 100)
}




class Detail extends Component {

    state = {
        dialogOpen: false
    }
    constructor(props) {
        super(props)
        this.toggleNodePower = this.toggleNodePower.bind(this)
        this.state = {}
    }
    toggleNodePower = () => {
        // let powerBit = this.props.detail.Power === 1 ? 0 : 1
        // let command = `${powerBit}00000000`
        // this.props.sendCommand(command, this.props.detail.Id)
    }

    openDialog = () => {
        this.setState({ dialogOpen: true })
    }

    closeDialog = () => {
        this.setState({ dialogOpen: false })
    }
    render() {
        const { detail, classes } = this.props;
        if (detail === null) {
            return (
                <CircularProgress />
            )
        }
        const date = dayjs(detail.Ping)
        // const powerStatus = detail.Power === 0 ? red[500] : green[500]
        return <div className={classes.detail}>
            <Card className={classes.card}>
                <div >
                    <div className={classes.cardheader}>
                        {/* <span style={{ ...styles.dot, backgroundColor: powerStatus }} ></span> */}
                        <Typography variant="headline" component="h2" className={classes.title}>
                            {/* <Link to={`/node/${detail.Id}`} >Node {detail.Id}</Link> */}
                            PMU {detail.Id}
                        </Typography>
                        {/* <Button onClick={this.openDialog}>Send Command</Button> */}
                    </div>
                    <Typography color="textSecondary">
                        Last Ping {date.fromNow()}
                    </Typography>

                </div>

                <CardContent className={classes.cardContent}>
                    <ValuesGrid>
                        <Block title={`Battery Voltage`} num={formatFloat(detail.BatteryVoltage)} dim='V' />
                        <Block title={` Grid Voltage`} num={formatFloat(detail.GridVoltage)} dim='V' />
                        <Block title={`Battery to Grid`} num={formatFloat(detail.PowerBatteryToGrid)} dim='W' />
                        <Block title={`Grid to Battery`} num={formatFloat(detail.PowerGridToBattery)} dim='W' />
                        <Block title={`Battery to Load`} num={formatFloat(detail.PowerBatteryToLoad)} dim='W' />
                        <Block title={`Solar Input`} num={formatFloat(detail.PowerSolarInput)} dim='W' />


                    </ValuesGrid>
                    <CommandPanel nodeId={detail.Id}
                        commandFunc={this.props.sendCommand}
                        switch1={detail.Switch1}
                        switch2={detail.Switch2}
                        loadSwitch1 = {detail.LoadSwitch1}
                        loadSwitch2 = {detail.LoadSwitch2}
                        loadSwitch3 = {detail.LoadSwitch3}
                        loadSwitch4 = {detail.LoadSwitch4}
                        powerLimit1={detail.Limit1.Float64}
                        powerLimit2={detail.Limit2.Float64}
                        powerLimit3={detail.Limit3.Float64}
                        powerLimit4={detail.Limit4.Float64}
                    />
                    {/* <PinStatus pinStatus={detail.Status} /> */}
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
        // fetchDetail: id => dispatch(fetchNodeDetail(id))

    }
}

const DetailContainer = connect(
    mapStateToProps, mapDispatchToProps
)(Detail)

export default withStyles(styles)(DetailContainer)