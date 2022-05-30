// Basic
import { Component } from "react";

// Router
import {
  Router,
  Route,
  Switch
} from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Pages
import Main from "./pages/main";
import Explorer from "./pages/explorer";
import history from "./utils/history";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/dbexplorer/:query" component={Explorer} />
            <Route path="*" component={Main} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
