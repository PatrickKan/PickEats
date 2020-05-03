import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Header from './layout/Header';
import Dashboard from './todos/Dashboard';

import RegisterForm from './auth/RegisterForm';
import LoginForm from './auth/LoginForm';
import PrivateRoute from './common/PrivateRoute';
import PickEatsForm from './survey/PickEatsForm';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import MainPage from './yelp/MainPage';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            <PrivateRoute exact path='/' component={MainPage} />
            <Route exact path = '/profile' component={Dashboard} />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/form' component={PickEatsForm} />
            <PrivateRoute exact path='/yelp' component={MainPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
