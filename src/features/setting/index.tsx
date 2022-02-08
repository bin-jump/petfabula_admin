import React, { useState } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { Typography, Button, PageHeader, Input, Layout, message } from 'antd';
import { useChangePassword } from './redux';
import { useDidUpdateEffect } from '../shared';

const { Title } = Typography;

const Setting = () => {
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const history = useHistory();
  const { changePassword, result, pending, error } = useChangePassword();

  const handleChangePassword = () => {
    if (passwordForm.newPassword != passwordForm.confirmPassword) {
      message.error('new password not match confirm');
      return;
    }

    changePassword(passwordForm);
  };

  useDidUpdateEffect(() => {
    if (error) {
      message.error(error.type);
    }
  }, [error]);

  useDidUpdateEffect(() => {
    if (result) {
      message.success('Changed');
    }
  }, [result]);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        style={{ background: '#fff' }}
        onBack={() => history.push('/manage')}
        title={`SETTINTG`}
        // subTitle="This is a subtitle"
      ></PageHeader>

      <div
        style={{
          padding: '8px 20px',
        }}
      >
        <div style={{ marginRight: 'auto', marginLeft: 'auto', width: 300 }}>
          <Title
            style={{
              textAlign: 'center',
            }}
            level={5}
          >{`Change Password`}</Title>

          <Input.Password
            style={{ margin: '8px' }}
            capture="a"
            placeholder="Password"
            value={passwordForm.password}
            onChange={(e) => {
              setPasswordForm({ ...passwordForm, password: e.target.value });
            }}
          />

          <Input.Password
            style={{ margin: '8px' }}
            capture="a"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={(e) => {
              setPasswordForm({ ...passwordForm, newPassword: e.target.value });
            }}
          />
          <Input.Password
            style={{ margin: '8px' }}
            capture="a"
            placeholder="Confirm Password"
            value={passwordForm.confirmPassword}
            onChange={(e) => {
              setPasswordForm({
                ...passwordForm,
                confirmPassword: e.target.value,
              });
            }}
          />
          <Button
            loading={pending}
            style={{ marginRight: 'auto', marginLeft: 'auto' }}
            onClick={handleChangePassword}
          >
            Change
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
