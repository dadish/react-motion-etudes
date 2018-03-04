import React, { Component } from 'react'

class CatRace extends Component {

  constructor (props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
    }
  }

  render () {
    return (
      <h1>Cat Race!</h1>
    )
  }
}

export default CatRace