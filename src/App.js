import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './views/Login.js'
import Companies from './views/Companies.js'
import Company from './views/Company.js'
import NewCompany from './views/NewCompany.js'
import Position from './views/Position.js'
import NewPosition from './views/NewPosition.js'

import logo from './assets/logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/login/">Login</Link>
              </li>
              <li>
                <Link to="/">Companies</Link>
              </li>
              <li>
                <Link to="/new-company/">NewCompany</Link>
              </li>
              <li>
                <Link to="/company/1">Company</Link>
              </li>
              <li>
                <Link to="/company/1/new-position/">NewPosition</Link>
              </li>
              <li>
                <Link to="/company/1/position/1/">Position</Link>
              </li>
            </ul>
          </nav>
          <img src={logo} className="App-logo" alt="logo" />

          <Route exact path="/login/" component={Login} />
          <Route exact path="/" component={Companies} />
          <Route exact path="/new-company/" component={NewCompany} />
          <Route exact path="/company/:id/" component={Company} />
          <Route exact path="/company/:id/new-position/" component={NewPosition} />
          <Route exact path="/company/:id/position/:id/" component={Position} />
        </div>
      </Router>
    );
  }
}

export default App;
