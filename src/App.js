import React, { Component } from 'react';
import MainControls from './components/MainControls';
import BodyControls from './components/BodyControls';
import Scene from './components/Scene'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);

    const bodies = [0,1,2].map(n => ({
      number: n,
      params: {
        m: Math.random(),
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        vz: Math.random() * 2 - 1
      }
    }))

    this.state = {
      bodies,
      t: 0.01,
      g: 10,
      showTrails: true
    }
  }

  handleBodyChange({ number, param }) {
    const bodies = this.state.bodies;
    bodies[number].params[param.name] = param.value;
    this.setState({ bodies })
  }

  handleParamChange({ name, value }) {
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="App">
        <div style={{ width: '228px' }}>
          <MainControls {...this.state} onChange={this.handleParamChange} />
          { this.state.bodies.map(body => <BodyControls key={`body${body.number}`} {...body} onChange={this.handleBodyChange} /> ) }
        </div>
        <Scene {...this.state} />
      </div>
    );
  }
}

export default App;
