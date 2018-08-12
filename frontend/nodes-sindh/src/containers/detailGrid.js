import { CircularProgress, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detail from './detail';


const styles = {

    grid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'

    }
}


class DetailGrid extends Component {

    render() {
        const { detail, classes } = this.props;
        if (detail.size === 0) {
            return <CircularProgress />
        }
        return <div className={classes.grid}>
            {
                detail.map((obj, i) =>
                    <Detail detail={obj} key={`${i}-${obj.Id}`} className={classes.detail} />
                )
            }
        </div>
    }
}


const mapStateToProps = state => {
    return {
        detail: state.detail.valueSeq().toArray() /* converting the immutable map to an array with only its values */
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // sendCommand: (command, node) => dispatch(sendCommand(command, node)),
        // fetchDetail: id => dispatch(fetchNodeDetail(id))

    }
}

const DetailGridContainer = connect(
    mapStateToProps
    , mapDispatchToProps
)(DetailGrid)

export default withStyles(styles)(DetailGridContainer)