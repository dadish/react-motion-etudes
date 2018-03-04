import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import './style.css'

class Switcher extends Component {

  constructor (props) {
    super(props)
    this.state = { on: false }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({ on: !this.state.on })
  }

  render () {
    return (
      <div className='switcher-container'>
        <h1 >Switcher</h1>
        <div className='switcher' onClick={this.toggle}>
          <Motion style={{x: spring(this.state.on ? 100 : 0)}} >
          {({ x }) =>
            <div
              className='switcher-slider'
              style={{
                transform: `translate(${x}px, 0px)`
              }}
            />
          }
          </Motion>
        </div>
      </div>
    )
  }
}

export default Switcher