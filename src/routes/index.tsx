import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../features/login';
import Manage from '../features/manage';
import { useCurrentUser } from '../features/login/redux';

export const Routes = () => {
  const { getCurrentUser } = useCurrentUser();

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/Login" component={Login} />
        <Route exact={true} path="/" component={Login} />
        <Route path="/manage" component={Manage} />
      </Switch>
    </BrowserRouter>
  );
};
