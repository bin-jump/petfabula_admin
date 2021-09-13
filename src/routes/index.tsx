import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../features/login';
import Manage from '../features/manage';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Manage} />
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/manage" component={Manage} />
    </Switch>
  </BrowserRouter>
);
