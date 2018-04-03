import React, { Component } from 'react'
import NumericInput from 'react-numeric-input'
import './Slider.css'

class Slider extends Component {
  handleSliderChange = event => {
    const name = event.target.name
    const value = +event.target.value

    this.props.onChange({ name, value })
  }

  handleTextChange = (value, _, input) => {
    const name = input.name
    this.props.onChange({ name, value })
  }

  render() {
    return (
      <div className="slider">
        <span className="label">{this.props.property}</span>
        <input
          type="range"
          {...this.props}
          name={this.props.property}
          step={this.props.step || 0.01}
          onChange={this.handleSliderChange}
        />
        <NumericInput
          {...this.props}
          step={this.props.step || 0.01}
          precision={2}
          name={this.props.property}
          onChange={this.handleTextChange}
        />
      </div>
    )
  }
}

export default Slider
