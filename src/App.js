import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Route } from 'react-router'
import './App.css'

import Counter from './Counter'
import Switcher from './Switcher'

const routes = [
  {
    path: '/',
    title: 'Home',
    component: null,
  },
  {
    path: '/counter',
    title: 'Counter',
    component: Counter
  },
  {
    path: '/switcher',
    title: 'Switcher',
    component: Switcher
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
          <ul>
            {routes.map((item, key) =>
              <li key={key}>
                <Link to={item.path}>{item.title}</Link>
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
