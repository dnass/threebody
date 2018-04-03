import React, { Component } from 'react'

class Checkbox extends Component {
  handleInputChange = event => {
    const name = event.target.name
    const value = event.target.checked
    this.props.onChange({ name, value })
  }

  render() {
    return (
      <div style={{ textAlign: 'left' }}>
        <label htmlFor={this.props.property}>
          {this.props.label || this.props.property}{' '}
        </label>
        <input
          type="checkbox"
          checked={this.props.value}
          name={this.props.property}
          id={this.props.property}
          onChange={this.handleInputChange}
        />
      </div>
    )
  }
}

export default Checkbox
