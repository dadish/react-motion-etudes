import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import './style.css'

import GoTo from '../GoTo'
import CatRace from '../CatRace'
import Beads from '../Beads'

const urlPrefix = '/react-motion-etudes'

const routes = [
  {
    path: `${urlPrefix}`,
    title: null,
    component: () => <Redirect to={`${urlPrefix}/go-to`} />,
  },
  {
    path: `${urlPrefix}/go-to`,
    title: 'Go To',
    component: GoTo
  },
  {
    path: `${urlPrefix}/cat-race`,
    title: 'Cat Race',
    component: CatRace
  },
  {
    path: `${urlPrefix}/beads`,
    title: 'Beads',
    component: Beads
  },
]

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">React Motion</h1>
            <a href='https://github.com/dadish/react-motion-etudes'>
              <i className='icon-github' />
            </a>
          </header>
          <ul className='menu-l'>
            {routes.map((item, key) =>
              <li key={key} className='menu-i'>
                <Link className='menu-i-a' to={item.path}>{item.title}</Link>
              </li>
            )}
          </ul>
          {routes.map((item, key) => <Route path={item.path} component={item.component} key={key} exact />)}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
