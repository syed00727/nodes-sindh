import React, { Component } from 'react'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'


const fill = status => status === '1' ? green[600] : red[500]
const toBin = dec => dec.toString(2).padStart(8, '0').split('')
const dot = {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
    margin : '1px'
}
class PinStatus extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const pinStatus = toBin(this.props.pinStatus)

        if (this.props.pinStatus == null) {
            return <div>not availalbe</div>
        }
        return (
            <div>
                {
                    pinStatus.map(
                        (status,i) => {
                            return <span style={{ ...dot, backgroundColor: fill(status) }} key={`status-${i}`}> </span>
                        }
                    )
                }
            </div>
        )
    }
}

export default PinStatus    