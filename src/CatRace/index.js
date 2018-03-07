import React from 'react'
import range from 'lodash/fp/range'
import shuffle from 'lodash/fp/shuffle'
import { StaggeredMotion, spring } from 'react-motion'

import SpringConfigComponent from '../SpringConfig'

import './style.css'

class CatRace extends SpringConfigComponent {

  constructor (props) {
    super(props)

    this.items = shuffle(range(0,7))
    
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.interpolatedStyles = this.interpolatedStyles.bind(this)
    this.renderCats = this.renderCats.bind(this)
  }

  handleMouseMove (e) {
    this.setState({
      x: e.clientX,
      y: e.clientY,
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

  interpolatedStyles (prevStyles) {
    const nextStyles = prevStyles.map((_, i) =>
      i === 0
      ? this.state
      : {
        x: spring(prevStyles[i - 1].x, this.getSpringConfig()),
        y: spring(prevStyles[i - 1].y, this.getSpringConfig()),
      }
    )
    return nextStyles
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
        ).reverse()}
      </div>
    )
  }

  render () {
    return (
      <div className='catRace-container'>
        <h1 className='demo-title'>Cat Race!</h1>
        <div className='demo-desc'>Move the mouse and cats will follow.</div>
        <StaggeredMotion styles={this.interpolatedStyles} defaultStyles={this.items.map(this.getCenterPosition)}>
          {this.renderCats}
        </StaggeredMotion>
        {this.renderSpringConfig()}
      </div>
    )
  }
}

export default CatRace