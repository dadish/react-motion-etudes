import React from 'react'

import './style.css'

import SpringConfigComponent from '../SpringConfig'
import Bead from './Bead'

const BASE_WIDTH = 800;

class Beads extends SpringConfigComponent {

  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      items: [
        '#001f3f','#0074D9','#7FDBFF',
        '#39CCCC','#3D9970','#2ECC40',
        '#01FF70','#FFDC00','#FF851B',
        '#FF4136','#85144b','#F012BE',
        '#B10DC9','#111111','#AAAAAA',
        '#DDDDDD',
      ]
    }

    this.getPositionForBead = this.getPositionForBead.bind(this)
    this.getPositionsForBeads = this.getPositionsForBeads.bind(this)
    this.getBasePosition = this.getBasePosition.bind(this)
    this.renderBeads = this.renderBeads.bind(this)
  }

  getPositionForBead (index, basePosition) {
    return {
      x: basePosition.x + index * 50,
      y: basePosition.y
    }
  }

  getBasePosition () {
    return {
      x: window.innerWidth / 2 - BASE_WIDTH / 2,
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
      />
    )
  }

  render () {
    return (
      <div className='beads-container'>
        <h1 className='demo-title'>Beads</h1>
        <div className='demo-desc'>Boobs</div>
        <div className='bead-l'>
          {this.renderBeads()}
        </div>
        {/* {this.renderSpringConfig()} */}
      </div>
    )
  }
}

export default Beads