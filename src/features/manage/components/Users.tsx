import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import {
  User,
  UserDetail,
  RestrictionForm,
  useLoadUsers,
  useLoadUserDetail,
  useCreateRestriction,
  useRemoveRestriction,
} from '../redux';

const PAGE_SIZE = 10;

const columns = [
  // {
  //   title: 'entityType',
  //   dataIndex: 'entityType',
  //   key: 'entityType',
  //   render: (text, record) => (
  //     <Link
  //       to={{
  //         pathname: resolveEntityLink(record),
  //         report: record,
  //       }}
  //       // params={{ report: record }}
  //     >{`${text}(${record.entityId})`}</Link>
  //   ),
  // },
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text, user) => (
      <Link
        to={{
          pathname: `/manage/users/${user.id}`,
        }}
        // params={{ report: record }}
      >{`${text}`}</Link>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Bio',
    dataIndex: 'bio',
    key: 'bio',
    // render: (user: User) => (
    //   <Typography>{user.name}</Typography>
    // ),
  },
];

const Users = () => {
  const [userId, setUserId] = useState('');
  const { loadUsers, users, page, size, total, pending } = useLoadUsers();
  const history = useHistory();

  useEffect(() => {
    if (!size) {
      loadUsers(0, PAGE_SIZE);
    }
  }, [size, loadUsers]);

  const pagination = { current: page + 1, pageSize: size, total };

  return (
    <div style={{ padding: 20 }}>
      User
      <Input.Group compact style={{ margin: '16px 0px' }}>
        <Input
          style={{ width: 200 }}
          value={userId}
          placeholder="user id"
          onChange={(e) => {
            const val = e.target.value;
            let isnum = /^\d+$/.test(val);
            if (!isnum && val.length > 0) {
              return;
            }
            setUserId(val);
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            let path = `/manage/users/${userId}`;
            history.push(path);
          }}
        >
          Find
        </Button>
      </Input.Group>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={users}
        pagination={pagination}
        loading={pending}
        onChange={(pagination) => {
          loadUsers(pagination.current - 1, pagination.pageSize);
        }}
      />
    </div>
  );
};

export default Users;
