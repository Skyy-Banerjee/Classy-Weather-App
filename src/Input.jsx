import React, { Component } from 'react'

export default class Input extends Component {
    render() {
        return (
            <div>
                <input type="text" placeholder="Search for location..."
                    value={this.props.location}
                    onChange={this.props.onChangeLocation} />
            </div>
        )
    }
}
