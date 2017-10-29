import React, { Component } from 'react';
import MainControls from './components/MainControls';
import BodyControls from './components/BodyControls';
import Scene from './components/Scene';
import copy from 'copy-to-clipboard';

const random = (low, high) => +(Math.random() * (high - low) + low).toFixed(2)

class App extends Component {
  constructor(props) {
    super(props);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);
    this.copyShareLink = this.copyShareLink.bind(this);

    let speed, g, zoom, showTrails, showControls = true;
    let bodies = [0,1,2].map(n => ({
      number: n,
      params: {m: '', x: '', y: '', z: '', vx: '', vy: '', vz: ''}
    }))

    const params = window.location.pathname.split('/').slice(1,).map(param => +param)
    window.history.pushState(null, '', window.location.origin)

    if (params.length === 25) {
      speed = params[0];
      g = params[1];
      zoom = params[2];
      showTrails = Boolean(params[3]);
      bodies.forEach((body, i) => {
        Object.keys(body.params).forEach((param, j) => body.params[param] = params[i * 7 + j + 4])
      })
    } else {
      speed = 10;
      g = 10;
      zoom = 5;
      showTrails = true;
      bodies.forEach(body => {
        Object.keys(body.params).forEach(param => body.params[param] = param === 'm' ? random(0,1) : random(-1, 1))
      })
    }

    this.state = { bodies, speed, g, zoom, showTrails, showControls }
  }

  handleBodyChange({ number, param }) {
    const bodies = this.state.bodies;
    bodies[number].params[param.name] = param.value;
    this.setState({ bodies })
  }

  handleParamChange({ name, value }) {
    this.setState({ [name]: value })
  }

  copyShareLink() {
    const {bodies, speed, g, zoom, showTrails} = this.state;
    const params = bodies.map(body => Object.values(body.params))
    const paramString = `/${speed}/${g}/${zoom}/${+showTrails}` + params.reduce((paramString, params) => {
        params.forEach(param => paramString += `/${param}`)
        return paramString;
      }, '');
    copy(`${window.location.origin}${paramString}`)
  }

  render() {
    return (
      <div className="App">
        <div>
          <MainControls {...this.state} share={this.copyShareLink} onChange={this.handleParamChange} />
          { this.state.showControls && this.state.bodies.map(body => <BodyControls key={`body${body.number}`} {...body} onChange={this.handleBodyChange} /> ) }
        </div>
        <Scene {...this.state} />
      </div>
    );
  }
}

export default App;
