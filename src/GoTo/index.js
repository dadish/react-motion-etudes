import React from 'react'
import { Motion, spring } from 'react-motion'

import SpringConfigComponent from '../SpringConfig'

import './style.css'

class Switcher extends SpringConfigComponent {

  constructor (props) {
    super(props)
    this.goTo = this.goTo.bind(this)
    this.getStyle = this.getStyle.bind(this)
  }

  goTo (e) {
    const x = parseInt(e.clientX, 10)
    const y = parseInt(e.clientY, 10)
    if (x === 0 && y === 0) {
      return
    }
    this.setState({ x, y })
  }

  getStyle () {
    return {
      x: spring(this.state.x, this.getSpringConfig()),
      y: spring(this.state.y, this.getSpringConfig()),
    }
  }

  componentWillMount () {
    window.addEventListener('click', this.goTo)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.goTo)
  }

  render () {
    return (
      <div className='goTo-container'>
        <h1 className='demo-title'>Go To</h1>
        <div className='demo-desc'>Click anywhere and the ball will follow.</div>
        <Motion style={this.getStyle()} >
        {({ x, y }) =>
          <div
            className='goTo-slider'
            style={{
              transform: `translate(${x}px, ${y}px)`
            }}
          />
        }
        </Motion>
        {this.renderSpringConfig()}
      </div>
    )
  }
}

export default Switcher