import React, { Component } from 'react';
import Slider from './Slider';
import Checkbox from './Checkbox';
import './Controls.css';

class MainControls extends Component {
  constructor(props) {
    super(props);
    this.handleParamChange = this.handleParamChange.bind(this);
  }

  handleParamChange(param) {
    this.props.onChange(param);
  }

  render() {
    return (
      <div className="controls">
        <div className='title'>Global</div>
        <Slider onChange={this.handleParamChange} property='t' value={this.props.t} min={0} max={0.1} />
        <Slider onChange={this.handleParamChange} property='g' value={this.props.g} min={0} max={25} />
        <Checkbox onChange={this.handleParamChange} property='showTrails' value={this.props.showTrails} min={1} max={100} />
      </div>
    );
  }
}

export default MainControls;
