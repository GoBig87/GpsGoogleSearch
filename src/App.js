import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import MapSearch from "./pages/map-search";
import User from "./util/user"


class App extends Component {
  constructor(props) {
    super(props);
  }
  switchScreen = (props, params) => {
    console.log('switching screen')
    console.log(params)
    props.history.push(params);
  };
  render() {
    return (
        <Router>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Route exact path="/" render={(props) => <MapSearch {...props}/> }/>
            {/*<Route exact path="/map-search" render={(props) => <MapSearch state={this.state} {...props}/> }/>*/}
          </div>
        </Router>
    );
  }
}

export default App;
