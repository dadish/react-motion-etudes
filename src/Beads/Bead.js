import React, { Component } from 'react'

class Bead extends Component {

  constructor (props) {
    super(props)

    const {
      positionX,
      positionY
    } = props

    this.state = {
      dragging: false,
      positionX,
      positionY,
    }

    this._mouseDown = false

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.getPosition = this.getPosition.bind(this)
  }

  handleMouseDown (e) {
    this.setState({
      dragging: true
    })
  }

  handleMouseUp (e) {
    this.setState({
      dragging: false,
      positionX: this.props.positionX,
      positionY: this.props.positionY,
    })
  }

  handleMouseMove (e) {
    if (!this.state.dragging) {
      return
    }
    const position = this.getPosition()
    this.setState({
      positionX: position.x + parseInt(e.movementX, 10),
      positionY: position.y + parseInt(e.movementY, 10),
    })
  }

  componentDidMount () {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  getPosition () {
    if (this.state.dragging) {
      return {
        x: this.state.positionX,
        y: this.state.positionY,
      }
    }
    return {
      x: this.props.positionX,
      y: this.props.positionY,
    }
  }

  render () {
    const position = this.getPosition()
    return (
      <div
        className='bead-i'
        style={{
          backgroundColor: this.props.color,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
        onMouseDown={this.handleMouseDown}
      />
    )
  }
}

export default Bead
