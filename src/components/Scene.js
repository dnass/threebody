import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import colors from '../helpers/colors';
import TrackballControls from '../helpers/trackball.js';
import './Scene.css'

class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 5),
      bodies: props.bodies.map(({ params }) => ({
        m: params.m,
        pos: new THREE.Vector3(params.x, params.y, params.z),
        mom: new THREE.Vector3(params.vx, params.vy, params.vz).multiplyScalar(params.m)
      })),
      trails: [[],[],[]]
   };

    this._onAnimate = () => {

      this.controls.update();

      let delta = 0.01, g = 10;

      let sun1 = this.state.bodies[0],
        sun2 = this.state.bodies[1],
        p = this.state.bodies[2];

      let vec1 = sun2.pos.clone().sub(sun1.pos.clone());
      let vec2 = p.pos.clone().sub(sun1.pos.clone());
      let vec3 = p.pos.clone().sub(sun2.pos.clone());

      let f12 = vec1.clone().normalize().multiplyScalar(-1 * g * sun1.m * sun2.m / Math.pow(vec1.clone().length(), 2))
      let f1p = vec2.clone().normalize().multiplyScalar(-1 * g * sun1.m * p.m / Math.pow(vec2.clone().length(), 2))
      let f2p = vec3.clone().normalize().multiplyScalar(-1 * g * sun2.m * p.m / Math.pow(vec3.clone().length(), 2))

      let sun1m = sun1.mom.clone().sub(f12.clone().add(f1p).multiplyScalar(delta));
      let sun2m = sun2.mom.clone().add(f12.clone().sub(f2p).multiplyScalar(delta));
      let pm = p.mom.clone().add(f1p.clone().add(f2p).multiplyScalar(delta));

      let sun1pos = sun1.pos.clone().add(sun1m.clone().multiplyScalar(delta / sun1.m));
      let sun2pos = sun2.pos.clone().add(sun2m.clone().multiplyScalar(delta / sun2.m));
      let ppos = p.pos.clone().add(pm.clone().multiplyScalar(delta / p.m));

      let bodies = [
        {
          m: sun1.m,
          pos: sun1pos,
          mom: sun1m
        }, {
          m: sun2.m,
          pos: sun2pos,
          mom: sun2m
        }, {
          m: p.m,
          pos: ppos,
          mom: pm
        }
      ];

      let trails = this.state.trails;
      trails[0].push(sun1pos);
      trails[1].push(sun2pos);
      trails[2].push(ppos);

      this.setState({bodies, trails})
    };
  }

  componentDidMount() {
    const controls = new TrackballControls(this.mainCamera, this.react3);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.addEventListener('change', () => {
      this.setState({
        cameraPosition: this.mainCamera.position,
      });
    });

    this.controls = controls;
  }

  componentWillReceiveProps(nextProps) {
    let state = { cameraPosition: new THREE.Vector3(0, 0, 5),
      bodies: nextProps.bodies.map(({ params }) => ({
        m: params.m,
        pos: new THREE.Vector3(params.x, params.y, params.z),
        mom: new THREE.Vector3(params.vx, params.vy, params.vz).multiplyScalar(params.m)
      })),
      trails: [[],[],[]]
    }
    this.setState(state)
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  _mainCameraRef = (mainCamera) => {
    this.mainCamera = mainCamera;
  };

  _react3Ref = (react3) => {
    this.react3 = react3;
  };

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (<div className='scene'>
      <React3
        mainCamera="mainCamera"
        width={width}
        height={height}
        antialias={true}
        onAnimate={this._onAnimate}
        canvasRef={this._react3Ref}
      >
        <scene>
          <perspectiveCamera
            name="mainCamera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            ref={this._mainCameraRef}
            position={this.state.cameraPosition}
          />
          {this.state.bodies.map((body, i) => (
            <mesh key={`body${i}`} position={ body.pos } >
              <sphereGeometry
                radius={0.1}
                widthSegments={10}
                heightSegments={10}
              />
              <meshBasicMaterial
                color={ parseInt(`0x${colors[i]}`, 16) }
              />
            </mesh>
          ))}
          {this.state.trails.length > 1 && this.state.trails.map((trail, i) => (
            <line key={`trail${Math.random()}`} >
              <geometry
                vertices={ trail }
              />
              <lineBasicMaterial
                color={ parseInt(`0x${colors[i]}`, 16) }
              />
            </line>
          ))}
        </scene>
      </React3>
  </div>);
  }
}

export default Scene;
