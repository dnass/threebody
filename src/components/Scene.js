import React, { Component } from 'react'
import React3 from 'react-three-renderer'
import { Vector3 } from 'three'
import colors from '../utils/colors'
import TrackballControls from '../utils/trackball'
import threeBodyCalc from '../utils/threeBodyCalc'
import './Scene.css'

class Scene extends Component {
  constructor(props) {
    super(props)
    this.state = this._initState(props)
  }

  componentDidMount() {
    const controls = new TrackballControls(this.mainCamera, this.react3)
    controls.rotateSpeed = 1.5
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8
    controls.staticMoving = true

    controls.addEventListener('change', () => {
      this.setState({
        cameraposition: this.mainCamera.position
      })
    })

    this.controls = controls
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._initState(nextProps))
  }

  componentWillUnmount() {
    this.controls.dispose()
    delete this.controls
  }

  _initState = ({ bodies, speed, g, zoom, showTrails }) => {
    return {
      cameraposition: new Vector3(0, 0, zoom),
      bodies: bodies.map(({ params }) => ({
        mass: params.m,
        position: new Vector3(params.x, params.y, params.z),
        momentum: new Vector3(params.vx, params.vy, params.vz).multiplyScalar(params.m)
      })),
      trails: [[], [], []],
      zoom,
      speed,
      g,
      showTrails
    }
  }

  _mainCameraRef = mainCamera => {
    this.mainCamera = mainCamera
  }

  _react3Ref = react3 => {
    this.react3 = react3
  }

  _onAnimate = () => {
    this.controls.update()
    this.setState(threeBodyCalc(this.state))
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <div className="scene">
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
              position={this.state.cameraposition}
            />
            {this.state.bodies.map((body, i) => (
              <mesh key={`body${i}`} position={body.position}>
                <sphereGeometry radius={0.1} widthSegments={10} heightSegments={10} />
                <meshBasicMaterial color={parseInt(`0x${colors[i]}`, 16)} />
              </mesh>
            ))}
            {this.state.showTrails &&
              this.state.trails.map((trail, i) => (
                <line key={`trail${Math.random()}`}>
                  <geometry vertices={trail} />
                  <lineBasicMaterial color={parseInt(`0x${colors[i]}`, 16)} />
                </line>
              ))}
          </scene>
        </React3>
      </div>
    )
  }
}

export default Scene
