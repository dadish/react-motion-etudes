import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

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
    this.getShadow = this.getShadow.bind(this)
  }

  handleMouseDown (e) {
    this.setState({
      dragging: true
    })
  }

  handleMouseUp (e) {
    if (!this.state.dragging) {
      return
    }
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
    const { positionX, positionY } = this.getPosition()
    this.setState({
      positionX: positionX + parseInt(e.movementX, 10),
      positionY: positionY + parseInt(e.movementY, 10),
    })
    this.props.handleMove(this.props.color, positionX, positionY)
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
        positionX: this.state.positionX,
        positionY: this.state.positionY,
      }
    }
    return {
      positionX: spring(this.props.positionX, this.props.springConfig),
      positionY: spring(this.props.positionY, this.props.springConfig),
    }
  }

  getShadow () {
    if (this.state.dragging) {
      return {
        offsetX: spring(2, this.props.springConfig),
        offsetY: spring(2, this.props.springConfig),
        blurRadius: spring(12, this.props.springConfig),
      }
    }
    return {
      offsetX: spring(0, this.props.springConfig),
      offsetY: spring(0, this.props.springConfig),
      blurRadius: spring(0, this.props.springConfig),
    }
  }

  getStyle () {
    return {
      ...this.getPosition(),
      ...this.getShadow()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.dragging) {
      return
    }
    if (
      nextProps.positionX !== this.state.positionX ||
      nextProps.positionY !== this.state.positionY
    ) {
      this.setState({
        positionX: nextProps.positionX,
        positionY: nextProps.positionY,
      })
    }
  }

  render () {
    return (
      <Motion style={this.getStyle()}>
        {({ positionX, positionY, offsetX, offsetY, blurRadius }) =>
        <div
          className={`bead-i ${blurRadius ? 'bead-i--active' : ''}`}
          style={{
            backgroundColor: this.props.color,
            transform: `translate(${positionX}px, ${positionY}px)`,
            boxShadow: `${offsetX}px ${offsetY}px ${blurRadius}px #000`,
          }}
          onMouseDown={this.handleMouseDown}
        />
        }
      </Motion>
    )
  }
}

export default Bead
