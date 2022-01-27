import React, { useEffect, useState } from 'react';
import { Divider, Card, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { sizedUri } from '../../shared';

const { Title } = Typography;

type User = {
  id: number;
  name: string;
  photo: string;
};

const UserField = ({ user }: { user: User }) => {
  return (
    <div>
      <Avatar
        src={sizedUri(user.photo)}
        size={42}
        style={{ float: 'left', marginRight: 8 }}
        icon={<UserOutlined />}
      />
      <div>
        <Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
          {user.name}
        </Typography>
        <Typography
          style={{ marginTop: -6, color: 'gray' }}
        >{`(${user.id})`}</Typography>
      </div>
    </div>
  );
};
export default UserField;
