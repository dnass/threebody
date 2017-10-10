import React, { Component } from 'react';
import Slider from './Slider.js';
import Checkbox from './Checkbox.js';
import './Controls.css';

class MainControls extends Component {
  constructor(props) {
    super(props);
    this.handleParamChange = this.handleParamChange.bind(this);
  }

  handleParamChange({ name, value }) {
    this.props.onChange({ name, value });
  }

  render() {
    return (
      <div className="controls">
        <div className='title'>Global</div>
        <Slider onChange={this.handleParamChange} property='t' value={this.props.t} min={0} max={0.1} />
        <Slider onChange={this.handleParamChange} property='g' value={this.props.g} min={0} max={25} />
        <Checkbox onChange={this.handleParamChange} property='trails' value={this.props.trails} min={1} max={100} />
      </div>
    );
  }
}

export default MainControls;
