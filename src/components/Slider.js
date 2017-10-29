import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import './Slider.css';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleSliderChange(event) {
    const name = event.target.name;
    const value = +event.target.value;

    this.props.onChange({ name, value });
  }

  handleTextChange(value, _, input) {
    const name = input.name;
    this.props.onChange({ name, value });
  }

  render() {
    return (
      <div className='slider'>
        <span className='label'>{this.props.property}</span>
        <input type='range' name={this.props.property} min={this.props.min} max={this.props.max} step={this.props.step || 0.01} value={this.props.value} onChange={this.handleSliderChange}></input>
        <NumericInput min={this.props.min} max={this.props.max} step={this.props.step || 0.01} precision={2} name={this.props.property} value={this.props.value} onChange={this.handleTextChange}></NumericInput>
      </div>
    );
  }
}

export default Slider;
