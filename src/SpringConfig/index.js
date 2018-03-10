import React, { Component } from 'react'
import { presets } from 'react-motion'

import './style.css'

const PRESET_NONE = 'none';

class SpringConfig extends Component {

  constructor (props) {
    super(props)

    this.state = {
      configOpen: true,
      stiffness: presets.gentle.stiffness,
      damping: presets.gentle.damping,
      preset: 'gentle',
      ...this.getCenterPosition(),
    }

    this.getCenterPosition = this.getCenterPosition.bind(this)
    this.renderPresets = this.renderPresets.bind(this)
    this.updateStiffness = this.updateStiffness.bind(this)
    this.updateDamping = this.updateDamping.bind(this)
    this.updateSpringConfig = this.updateSpringConfig.bind(this)
    this.getSpringConfig = this.getSpringConfig.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)
  }

  getCenterPosition () {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
  }

  updateStiffness (e) {
    this.setState({
      damping: this.state.damping,
      stiffness: parseInt(e.target.value, 10),
      preset: PRESET_NONE,
    })
  }

  updateDamping (e) {
    this.setState({
      stiffness: this.state.stiffness,
      damping: parseInt(e.target.value, 10),
      preset: PRESET_NONE,
    })
  }

  getSpringConfig (preset) {
    preset = preset || this.state.preset
    if (preset === PRESET_NONE) {
      return {
        stiffness: this.state.stiffness,
        damping: this.state.damping,
      }
    }
    return {
      stiffness: presets[preset].stiffness,
      damping: presets[preset].damping,
    }
  }

  updateSpringConfig (e) {
    const preset = e.target.value
    const springConfig = this.getSpringConfig(preset)
    this.setState({
      ...springConfig,
      preset,
    })
  }

  handleIconClick () {
    this.setState({
      configOpen: !this.state.configOpen
    })
  }

  renderPresets () {
    const keys = Object.keys(presets)
    return (
      <select
        className='catConfig-preset-l'
        onChange={this.updateSpringConfig}
        value={this.state.preset}
      >
        <option className='catConfig-preset-i' value={PRESET_NONE} key={PRESET_NONE}/>
        {keys.map((preset) =>
          <option className='catConfig-preset-i' value={preset} key={preset}>
            {preset}
          </option>
        )}
      </select>
    )
  }

  renderSpringConfig () {
    return (
      <div className='springConfig-container'>
        <i
          className={`${this.state.configOpen ? 'icon-close' : 'icon-cog'} icon-close-open`}
          onClick={this.handleIconClick}
        />
        <ul className='springConfig-l'
          style={{ display: this.state.configOpen ? 'block' : 'none' }}
        >
          <h3 className='springConfig-title'>Spring Config</h3>
          <li className='springConfig-i'>
            <label className='springConfig-labal'>
              <div>
                <div className='springConfig-label--name'>Stiffness</div>
                <div className='springConfig-label--value'>{this.state.stiffness}</div>
              </div>
              <input
                className='springConfig-input springConfig-input--stiffness'
                type='range'
                min={0}
                max={300}
                onChange={this.updateStiffness}
                value={this.state.stiffness}
              />
            </label>
          </li>
          <li className='springConfig-i'>
            <label className='springConfig-labal'>
              <div>
                <div className='springConfig-label--name'>Damping</div>
                <div className='springConfig-label--value'>{this.state.damping}</div>
              </div>
              <input
                className='springConfig-input springConfig-input--damping'
                type='range'
                min={0}
                max={40}
                onChange={this.updateDamping}
                value={this.state.damping}
              />
            </label>
          </li>
          <li className='springConfig-i'>
            {this.renderPresets()}
          </li>
        </ul>
      </div>
    )
  }

}

export default SpringConfig