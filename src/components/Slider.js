import React, { Component } from 'react';
import './Slider.css';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clampAndRound = this.clampAndRound.bind(this);
    this.padRight = this.padRight.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = +event.target.value;

    this.props.onChange({name, value});
  }

  clampAndRound(num) {
    if (num < this.props.min) return this.props.min;
    if (num > this.props.max) return this.props.max;
    return parseFloat(num).toFixed(2);
  }

  padRight(text, pad) {
    return `${text}${Array(pad - text.length + 1).join(' ')}`
  }

  render() {
    return (
      <div className='slider'>
        <span className='label'>{this.padRight(this.props.property, 2)}</span>
        <input type='range' name={this.props.property} min={this.props.min} max={this.props.max} step={0.01} value={this.props.value} onChange={this.handleInputChange}></input>
        <input type='text' name={this.props.property} value={this.clampAndRound(this.props.value)} onChange={this.handleInputChange}></input>
      </div>
    );
  }
}

export default Slider;
