import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import Login from './components/Login';
import User from './components/User';
import Signup from './components/Signup';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path={'/'} component={Login} />
      <Route path={'/user'} component={User} />
      <Route path={'/signup'} component={Signup} />
      <Redirect to={"/"} />
    </Switch>
  </Router>,
  document.querySelector('#root')
);
