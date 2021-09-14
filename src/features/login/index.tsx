import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useCurrentUser } from './redux';
import Login from './components/Login';

const LoginMain = () => {
  const { currentUser } = useCurrentUser();

  if (currentUser) {
    return <Redirect to="/manage" />;
  }

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginMain;
