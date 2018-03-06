import React, { Component } from 'react'
import range from 'lodash/fp/range'
import shuffle from 'lodash/fp/shuffle'
import { StaggeredMotion, spring } from 'react-motion'

import './style.css'

class CatRace extends Component {

  constructor (props) {
    super(props)

    this.items = shuffle(range(0,7))
    
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.interpolatedStyles = this.interpolatedStyles.bind(this)
    this.renderCats = this.renderCats.bind(this)
    this.initialCatPosition = this.initialCatPosition.bind(this)
    this.updateStiffness = this.updateStiffness.bind(this)
    this.updatedamping = this.updatedamping.bind(this)
        
    this.state = {
      catPosition: this.initialCatPosition(),
      springConfig: {
        stiffness: 170,
        damping: 26,
      },
    }
  }

  handleMouseMove (e) {
    this.setState({
      catPosition: { x: e.clientX, y: e.clientY }
    })
  }

  handleTouchMove (e) {
    this.handleMouseMove(e.touches[0])
  }

  componentDidMount () {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchmove', this.handleTouchMove)
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('touchmove', this.handleTouchMove)
  }

  initialCatPosition () {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight /2
    }
  }

  interpolatedStyles (prevStyles) {
    const nextStyles = prevStyles.map((_, i) =>
      i === 0
      ? this.state.catPosition
      : {
        x: spring(prevStyles[i - 1].x, this.state.springConfig),
        y: spring(prevStyles[i - 1].y, this.state.springConfig),
      }
    )
    return nextStyles
  }

  updateStiffness (e) {
    this.setState({
      springConfig: {
        ...this.state.springConfig,
        stiffness: parseInt(e.target.value, 10),
      }
    })
  }

  updatedamping (e) {
    this.setState({
      springConfig: {
        ...this.state.springConfig,
        damping: parseInt(e.target.value, 10),
      }
    })
  }

  renderCats (styles) {
    return (
      <div className='cat-heads'>
        {styles.map(({ x, y }, key) =>
          <div
            className={`cat-head cat-head-${this.items[key] + 1}`}
            key={key}
            style={{
              transform: `translate(${x}px, ${y}px)`
            }}
          />
        )}
      </div>
    )
  }

  render () {
    return (
      <div className='catRace-container'>
        <h1>Cat Race!</h1>
        <StaggeredMotion styles={this.interpolatedStyles} defaultStyles={this.items.map(this.initialCatPosition)}>
          {this.renderCats}
        </StaggeredMotion>
        <ul className='catConfig-l'>
          <h3>Spring Config</h3>
          <li className='catConfig-i'>
            <label className='catConfig-labal'>
              <div>
                <div className='catConfig-label--name'>Stiffness</div>
                <div className='catConfig-label--value'>{this.state.springConfig.stiffness}</div>
              </div>
              <input
                className='catConfig-input catConfig-input--stiffness'
                type='range'
                min={0}
                max={300}
                onChange={this.updateStiffness}
                value={this.state.springConfig.stiffness}
              />
            </label>
          </li>
          <li className='catConfig-i'>
            <label className='catConfig-labal'>
              <div>
                <div className='catConfig-label--name'>Damping</div>
                <div className='catConfig-label--value'>{this.state.springConfig.damping}</div>
              </div>
              <input
                className='catConfig-input catConfig-input--damping'
                type='range'
                min={0}
                max={40}
                onChange={this.updatedamping}
                value={this.state.springConfig.damping}
              />
            </label>
          </li>
        </ul>
      </div>
    )
  }
}

export default CatRace