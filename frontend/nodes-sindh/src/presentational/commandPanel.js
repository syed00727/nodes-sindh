import React, { Component, Fragment } from 'react'
import { withStyles, Switch, FormControlLabel, TextField, Grid, Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        gridGap: '5px',
        justifyItems: 'center',
        marginBottom: 5
    }
})


class CommandPanel extends Component {

    state = {
        switch1: 0,
        switch2: 0,
        powerLimit1: 0,
        powerLimit2: 0
    }
    handleStatusChange = name => event => {
        this.setState({ [name]: event.target.checked ? 1 : 0 })
    }

    handlePowerLimitChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleSubmit = () => {
        let command = `${this.state.switch1}|${this.state.switch2}|${this.state.powerLimit1}|${this.state.powerLimit2}`
        this.props.commandFunc(command, this.props.nodeId)
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.root}>
                    <FormControlLabel
                        root={classes.formControlLabel}
                        label='Switch 1'
                        checked={this.state.switch1 == 1}
                        onChange={this.handleStatusChange('switch1')}
                        control={
                            <Switch />
                        } />

                    <FormControlLabel
                        root={classes.formControlLabel}
                        label='Switch 2'
                        checked={this.state.switch2 == 1}
                        onChange={this.handleStatusChange('switch2')}
                        control={
                            <Switch />
                        } />

                    <TextField
                        id="power-limit-1"
                        label="Power Limit 1"
                        value={this.state.powerLimit1}
                        onChange={this.handlePowerLimitChange('powerLimit1')}
                    />

                    <TextField
                        id="power-limit-2"
                        label="Power Limit 2"
                        value={this.state.powerLimit2}
                        onChange={this.handlePowerLimitChange('powerLimit2')}
                    />


                </div>
                <Button color='secondary' onClick={this.handleSubmit}>Submit</Button>

            </Fragment>

        )
    }
}

export default withStyles(styles)(CommandPanel)