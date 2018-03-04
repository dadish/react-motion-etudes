import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Route } from 'react-router'
import './style.css'

import Switcher from '../Switcher'
import CatRace from '../CatRace'

const routes = [
  {
    path: '/',
    title: 'Home',
    component: null,
  },
  {
    path: '/switcher',
    title: 'Switcher',
    component: Switcher
  },
  {
    path: '/cat-race',
    title: 'Cat Race',
    component: CatRace
  },
]

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">React Motion</h1>
          </header>
          <ul className='menu-l'>
            {routes.map((item, key) =>
              <li key={key} className='menu-i'>
                <Link className='menu-i-a' to={`/react-motion-etudes${item.path}`}>{item.title}</Link>
              </li>
            )}
          </ul>
          {routes.map((item, key) => item.component ? <Route path={item.path} component={item.component} key={key} /> : null)}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
