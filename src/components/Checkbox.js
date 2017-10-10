import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    console.log(this.props.value);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.checked;
    this.props.onChange({name, value});
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.property}>{this.props.property} </label>
        <input type='checkbox' checked={this.props.value} name={this.props.property} id={this.props.property} onChange={this.handleInputChange}></input>
      </div>
    );
  }
}

export default Checkbox;
