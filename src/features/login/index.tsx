import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'antd';
import Login from './components/Login';

const LoginMain = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginMain;
