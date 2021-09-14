import React, { useEffect, useState } from 'react';
import { Table, Tag, Popconfirm, Typography, Button, Modal, Input } from 'antd';
import {
  useLoadSytemNotification,
  useCreateSystemNotification,
  useUpdateSystemNotification,
  useRemoveSystemNotification,
  SystemNotification,
} from '../redux';
import { useDidUpdateEffect, toFullTextDate, PendingModal } from '../../shared';

const { TextArea } = Input;

const PAGE_SIZE = 10;

const CreateNotification = ({
  show,
  handleCancel,
}: {
  show: boolean;
  handleCancel: () => void;
}) => {
  const [notification, setNotification] = useState({ title: '', content: '' });
  const { createNotification, error, pending } = useCreateSystemNotification();

  return (
    <div>
      <Modal
        confirmLoading={pending}
        title="Create"
        visible={show}
        onCancel={handleCancel}
        onOk={() => {
          createNotification(notification);
        }}
      >
        <Input
          placeholder="Title"
          value={notification.title}
          onChange={(e) => {
            setNotification({ ...notification, title: e.target.value });
          }}
        />
        <TextArea
          style={{ marginTop: 16 }}
          placeholder="Content"
          rows={4}
          value={notification.content}
          onChange={(e) => {
            setNotification({ ...notification, content: e.target.value });
          }}
        />
        <div style={{ color: 'red' }}>
          {error ? JSON.stringify(error) : null}
        </div>
      </Modal>
    </div>
  );
};

const UpdateNotification = ({
  handleCancel,
  data,
}: {
  data: SystemNotification | null;
  handleCancel: () => void;
}) => {
  const [notification, setNotification] = useState(data);
  const { updateNotification, error, pending } = useUpdateSystemNotification();

  const show = data ? true : false;

  useEffect(() => {
    setNotification(data);
  }, [data]);

  return (
    <div>
      <Modal
        confirmLoading={pending}
        title="Update"
        visible={show}
        onCancel={handleCancel}
        onOk={() => {
          updateNotification(notification);
        }}
      >
        {notification ? (
          <div>
            <Input
              placeholder="Title"
              value={notification.title}
              onChange={(e) => {
                setNotification({ ...notification, title: e.target.value });
              }}
            />
            <TextArea
              style={{ marginTop: 16 }}
              placeholder="Content"
              rows={4}
              value={notification.content}
              onChange={(e) => {
                setNotification({ ...notification, content: e.target.value });
              }}
            />
            <div style={{ color: 'red' }}>
              {error ? JSON.stringify(error) : null}
            </div>
          </div>
        ) : (
          <div>no object to edit</div>
        )}
      </Modal>
    </div>
  );
};

const SystemNotifications = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState<SystemNotification | null>(null);
  const { loadNotifications, notifications, page, size, total, pending } =
    useLoadSytemNotification();
  const { result } = useCreateSystemNotification();
  const { result: updateResult } = useUpdateSystemNotification();
  const { removeNotification, pending: removePending } =
    useRemoveSystemNotification();

  useEffect(() => {
    if (!size) {
      loadNotifications(0, PAGE_SIZE);
    }
  }, [size]);

  useDidUpdateEffect(() => {
    if (result) {
      setShowCreate(false);
    }
  }, [result]);

  useDidUpdateEffect(() => {
    if (updateResult) {
      setEditItem(null);
    }
  }, [updateResult]);

  const pagination = { current: page + 1, pageSize: size, total };

  const handleClose = () => {
    setShowCreate(false);
  };

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <p>{`${text}`}</p>,
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => <p>{`${text}`}</p>,
    },
    {
      title: 'createdDate',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text, record) => <p>{`${toFullTextDate(text)}`}</p>,
    },
    {
      title: 'opertaion',
      dataIndex: 'opertaion',
      render: (_, record) => (
        <div>
          <Typography.Link
            onClick={() => {
              setEditItem(record);
            }}
          >
            Edit
          </Typography.Link>

          <Popconfirm
            style={{}}
            title="Delete?"
            onConfirm={() => {
              removeNotification(record.id);
            }}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a style={{ marginLeft: 16, color: 'red' }} href="#">
              Delete
            </a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => setShowCreate(true)}>Create</Button>
      <CreateNotification show={showCreate} handleCancel={handleClose} />
      <UpdateNotification
        data={editItem}
        handleCancel={() => {
          setEditItem(null);
        }}
      />

      <PendingModal pending={removePending} />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={notifications}
        pagination={pagination}
        loading={pending}
        onChange={(pagination) => {
          loadNotifications(pagination.current - 1, pagination.pageSize);
        }}
      />
    </div>
  );
};

export default SystemNotifications;
