import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import Login from './screens/login/login';
import LoginCheckout from './screens/loginCheckout/login';
import Main from './screens/main/main';
import ContextModule from './utils/contextModule';
import history from "./utils/history";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import MainCheckout from './screens/mainCheckout/main';

class App extends Component {
  constructor(props) {
    super(props);
    reactAutobind(this);
  }

  static contextType = ContextModule;

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Routes>
            <Route path="/" element={
              <>
                {
                  this.context.value.page === 1 &&
                  <Login />
                }
                {
                  this.context.value.page === 2 &&
                  <Main />
                }
              </>
            } />
            <Route path="/checkout" element={
              <>
                {
                  this.context.value.page === 1 &&
                  <LoginCheckout />
                }
                {
                  this.context.value.page === 2 &&
                  <MainCheckout />
                }
              </>
            } />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;