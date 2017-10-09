import React, { Component } from 'react';
import Controls from './components/Controls';
import Scene from './components/Scene'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleBodyChange = this.handleBodyChange.bind(this);

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

    this.state = { bodies }
  }

  handleBodyChange(event) {
    const bodies = this.state.bodies;
    bodies[event.number].params[event.param.name] = event.param.value;
    this.setState({ bodies })
  }

  render() {
    return (
      <div className="App">
        { this.state.bodies.map((body, i) => <Controls key={`body${body.number}`} number={body.number} onChange={this.handleBodyChange} params={body.params} /> ) }
        <Scene bodies={this.state.bodies} />
      </div>
    );
  }
}

export default App;
