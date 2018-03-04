import React, { Component } from 'react'
import range from 'lodash/fp/range'
import shuffle from 'lodash/fp/shuffle'
import { StaggeredMotion, spring, presets } from 'react-motion'

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
        
    this.state = this.initialCatPosition()
  }

  handleMouseMove (e) {
    this.setState({ x: e.clientX, y: e.clientY })
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
      ? this.state
      : {
        x: spring(prevStyles[i - 1].x, presets.gentle),
        y: spring(prevStyles[i - 1].y, presets.gentle),
      }
    )
    return nextStyles
  }

  renderCats (styles) {
    return (
      <div className='cat-heads'>
        {styles.map(({ x, y }, key) =>
          <div
            className={`cat-head cat-head-${key + 1}`}
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
      </div>
    )
  }
}

export default CatRace