import React from 'react'
import { Motion, spring } from 'react-motion'

const Counter = () =>
  <div>
    <h1>Counter</h1>
    <Motion defaultStyle={{ x: 0 }} style={{ x: spring(10) }}>
      {value => <h1>{value.x}</h1>}
    </Motion>
  </div>

export default Counter