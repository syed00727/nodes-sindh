import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';
import { Card, CardHeader, withStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey'

const styles = {
    title: {
        fontSize: 18,
        color: grey[700]
    }
}

class TimeSeries extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Card style={{ paddingLeft: 10, paddingBottom: 5, margin: 2 }}>
                <CardHeader classes={classes} title={this.props.YTitle} />
                <XYPlot height={this.props.height} width={this.props.width}
                    xType="time"
                >
                    <XAxis tickLabelAngle={-45} title="Time" />
                    <YAxis title={this.props.YTitle} />
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <LineSeries stroke={this.props.stroke ? this.props.stroke : null} data={this.props.data} />
                </XYPlot>
            </Card>
        )
    }
}

export default withStyles(styles)(TimeSeries)