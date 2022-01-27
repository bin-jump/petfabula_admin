import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Typography, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import {
  useLoadTestUsers,
  useCreateTestUser,
  useUpdateTestUserAuthInfo,
  TestUser,
  TestUserAuthForm,
} from '../redux';
import { useDidUpdateEffect, toFullTextDate, PendingModal } from '../../shared';

const { Text } = Typography;

const CreateTestUser = ({
  show,
  handleCancel,
}: {
  show: boolean;
  handleCancel: () => void;
}) => {
  const [content, setContent] = useState({ name: '', email: '', code: '' });
  const { createTestUser, error, pending } = useCreateTestUser();

  return (
    <div>
      <Modal
        confirmLoading={pending}
        title="Create"
        visible={show}
        onCancel={handleCancel}
        onOk={() => {
          createTestUser(content);
        }}
      >
        <Input
          style={{ marginBottom: 16 }}
          placeholder="Name"
          value={content.name}
          onChange={(e) => {
            setContent({ ...content, name: e.target.value });
          }}
        />
        <Input
          style={{ marginBottom: 16 }}
          placeholder="Email"
          value={content.email}
          onChange={(e) => {
            setContent({ ...content, email: e.target.value });
          }}
        />
        <Input
          placeholder="Code"
          value={content.code}
          onChange={(e) => {
            setContent({ ...content, code: e.target.value });
          }}
        />

        <div style={{ color: 'red' }}>
          {error ? JSON.stringify(error) : null}
        </div>
      </Modal>
    </div>
  );
};

const UpdateTestUserAuth = ({
  data,
  handleCancel,
}: {
  data: TestUser | null;
  handleCancel: () => void;
}) => {
  const [content, setContent] = useState(data);
  const { updateTestUserAuthInfo, error, pending } =
    useUpdateTestUserAuthInfo();

  useEffect(() => {
    setContent(data);
  }, [data]);

  const show = data ? true : false;
  return (
    <div>
      <Modal
        confirmLoading={pending}
        title={`Update: ${content?.name}(${content?.id})`}
        visible={show}
        onCancel={handleCancel}
        onOk={() => {
          updateTestUserAuthInfo(content);
        }}
      >
        {content && (
          <div>
            <Input
              addonBefore="code"
              placeholder="Code"
              value={content.code}
              onChange={(e) => {
                setContent({ ...content, code: e.target.value });
              }}
            />

            <div
              style={{
                marginTop: 16,
                // justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Text type="warning" style={{ float: 'left', marginRight: 16 }}>
                {content?.active ? 'Active' : 'Deactive'}
              </Text>
              <Button
                style={{ marginTop: 16 }}
                onClick={() => {
                  updateTestUserAuthInfo({
                    ...content,
                    active: !content.active,
                  });
                }}
                type="primary"
              >
                {content?.active ? 'Set Deactive' : 'Set Active'}
              </Button>
            </div>
          </div>
        )}

        <div style={{ color: 'red' }}>
          {error ? JSON.stringify(error) : null}
        </div>
      </Modal>
    </div>
  );
};

const TestUsers = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [userToUpdateAuth, setUserToUpdateAuth] = useState(null);
  const { loadTestUsers, testUsers, pending } = useLoadTestUsers();
  const { result: createResult } = useCreateTestUser();
  const { result: updateAuthResult } = useUpdateTestUserAuthInfo();
  const {
    updateTestUserAuthInfo,
    error,
    pending: updatePending,
  } = useUpdateTestUserAuthInfo();

  const handleUpdateAuth = (form: TestUserAuthForm) => {
    updateTestUserAuthInfo(form);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active, user: TestUser) => {
        return (
          <Typography style={{ color: active ? 'green' : 'red' }}>
            {active ? 'yes' : 'no'}
          </Typography>
        );
      },
    },
    {
      title: 'Edit',
      dataIndex: 'active',
      key: 'active',
      render: (active, user: TestUser) => {
        return (
          <Button onClick={() => setUserToUpdateAuth(user)}>Update Auth</Button>
        );
      },
    },
  ];

  useEffect(() => {
    loadTestUsers();
  }, [loadTestUsers]);

  useDidUpdateEffect(() => {
    if (createResult) {
      setShowCreate(false);
    }
  }, [createResult]);

  useDidUpdateEffect(() => {
    if (updateAuthResult) {
      setUserToUpdateAuth(null);
    }
  }, [updateAuthResult]);

  return (
    <div style={{ padding: 20 }}>
      Test User
      <Button onClick={() => setShowCreate(true)}>Create Test User</Button>
      <CreateTestUser
        show={showCreate}
        handleCancel={() => setShowCreate(false)}
      />
      <UpdateTestUserAuth
        data={userToUpdateAuth}
        handleCancel={() => setUserToUpdateAuth(null)}
      />
      <Table
        style={{ marginTop: 20 }}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={testUsers}
        loading={pending}
      />
    </div>
  );
};

export default TestUsers;
