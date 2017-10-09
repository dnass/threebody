import React, { Component } from 'react';
import Slider from './Slider.js';
import colors from '../helpers/colors';
import './Controls.css';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  handleBodyChange(param) {
    this.props.onChange({number: this.props.number, param});
  }

  render() {
    return (
      <div className="controls" style={{ backgroundColor: `#${colors[this.props.number]}`}}>
        <div className='title'>Body {this.props.number + 1}</div>
        {Object.keys(this.props.params).map(property => ( <Slider key={`body${this.props.number}${property}`} onChange={this.handleBodyChange} property={property} value={this.props.params[property]} min={property === 'm' ? 0.01 : -1} max='1' /> ) )}
      </div>
    );
  }
}

export default Controls;
