import React, { Component } from 'react'
import styled from 'styled-components'

const Grid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

`;

export default class ValuesGrid extends Component {
    render() {

        return (<Grid>
            {this.props.children}
        </Grid>);
    }
}