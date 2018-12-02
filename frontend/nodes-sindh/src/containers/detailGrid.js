import { CircularProgress, withStyles, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detail from './detail';
import styled from 'styled-components'

const styles = {

    grid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'

    }
}
const Empty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;

 `;

class DetailGrid extends Component {

    render() {
        const { detail, classes } = this.props;
        if (detail === null) {
            return (
                <Empty>
                    <Typography variant='display1' component='h6'>
                    Loading data 
                    </Typography>
                    <CircularProgress/>
                </Empty>
            )
        }
        if (detail.length === 0) {
            return (
                <Empty>
                    <Typography variant='display1' component='h6'>
                        No Data found
                    </Typography>
                </Empty>
            )
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
        detail: state.detail === null ? null : state.detail.valueSeq().toArray() /* converting the immutable map to an array with only its values */
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