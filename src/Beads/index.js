import React from 'react'
import shuffle from 'lodash/fp/shuffle'

import './style.css'

import SpringConfigComponent from '../SpringConfig'
import Bead from './Bead'

const colors = [
  '#001f3f','#0074D9','#7FDBFF',
  '#39CCCC','#3D9970','#2ECC40',
  '#01FF70','#FFDC00','#FF851B',
  '#FF4136','#85144b','#F012BE',
  '#B10DC9','#111111','#AAAAAA',
  '#DDDDDD',
]

class Beads extends SpringConfigComponent {

  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      configOpen: false,
      items: [...colors]
    }

    this.handleBeadMove = this.handleBeadMove.bind(this)
    this.getPositionForBead = this.getPositionForBead.bind(this)
    this.getPositionsForBeads = this.getPositionsForBeads.bind(this)
    this.getBasePosition = this.getBasePosition.bind(this)
    this.renderBeads = this.renderBeads.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleShuffle = this.handleShuffle.bind(this)
  }

  handleBeadMove (color, positionX, positionY) {
    const basePosition = this.getBasePosition()
    const distanceFromBaseStart = positionX - basePosition.x
    let newIndex = Math.floor(distanceFromBaseStart / 50)
    if (newIndex < 0) {
      newIndex = 0
    }

    if (newIndex > this.state.items.length - 1) {
      newIndex = this.state.items.length - 1
    }

    const currectIndex = this.state.items.indexOf(color)

    this.updateBeadIndex(currectIndex, newIndex)
  }

  isMuted () {
    for (let i = 0; i < colors.length; i += 1) {
      if (this.state.items[i] !== colors[i]) {
        return true
      }
    }
    return false
  }

  handleReset () {
    if (this.isMuted()) {
      this.setState({
        items: [...colors]
      })
    }
  }

  handleShuffle () {
    this.setState({
      items: shuffle([...colors])
    })
  }

  updateBeadIndex (currectIndex, newIndex) {
    const items = [...this.state.items]
    const item = items.splice(currectIndex, 1)
    items.splice(newIndex, 0, ...item)
    this.setState({ items })
  }

  getPositionForBead (index, basePosition) {
    return {
      x: basePosition.x + index * 50,
      y: basePosition.y
    }
  }

  getBasePosition () {
    return {
      x: window.innerWidth / 2 - this.state.items.length * 50 / 2,
      y: window.innerHeight / 2,
    }
  }
  
  getPositionsForBeads () {
    const basePosition = this.getBasePosition()
    return this.state.items.map((color, index) => this.getPositionForBead(index, basePosition))
  }

  renderBeads () {
    const positions = this.getPositionsForBeads()
    return this.state.items.map((color, index) =>
      <Bead
        key={color}
        color={color}
        positionX={positions[index].x}
        positionY={positions[index].y}
        springConfig={this.getSpringConfig()}
        handleMove={this.handleBeadMove}
      />
    )
  }

  render () {
    return (
      <div className='beads-container'>
        <h1 className='demo-title'>Beads</h1>
        <div className='demo-desc'>Drag n Drop the beads to rearrange.</div>
        <button disabled={!this.isMuted()} className='beads-reset' onClick={this.handleReset}>Reset</button>
        <button className='beads-reset' onClick={this.handleShuffle}>Shuffle</button>
        <div className='bead-l'>
          {this.renderBeads()}
        </div>
        {this.renderSpringConfig()}
      </div>
    )
  }
}

export default Beads