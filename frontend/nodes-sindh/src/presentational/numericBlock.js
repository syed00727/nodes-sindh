import React, { Component } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const BlockDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2px;
    padding: 2px;
    background-color: #FAFAFA;
    width: 110px;
`;

const Value = styled.div`
 margin: 5px;
`;

export default class Block extends Component {
    render() {
        
        const { title, num, dim } = this.props;

        return (
            <BlockDiv>
                <Typography variant='body2' component='h5'>
                    {title}
                </Typography>
                <Value>
                    {num} {dim}
                </Value>
            </BlockDiv>
        )
    }
}