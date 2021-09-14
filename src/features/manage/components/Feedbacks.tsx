import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useLoadFeedbacks, Participator, Feedback } from '../redux';

const PAGE_SIZE = 10;

const columns = [
  {
    title: 'reporter',
    dataIndex: 'reporter',
    key: 'reporter',
    render: (text, record: Feedback) => <p>{record.reporter.name}</p>,
  },
  {
    title: 'content',
    dataIndex: 'content',
    key: 'content',
  },
];

const Feedbacks = () => {
  const { loadFeedbacks, feedbacks, page, size, total, pending } =
    useLoadFeedbacks();

  useEffect(() => {
    if (!size) {
      loadFeedbacks(0, PAGE_SIZE);
    }
  }, [size]);

  // useEffect(() => {
  //   setPagination({current: page + 1, pageSize: size})
  // }, [page, size]);

  const pagination = { current: page + 1, pageSize: size, total };

  return (
    <div style={{ padding: 20 }}>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={feedbacks}
        pagination={pagination}
        loading={pending}
        onChange={(pagination) => {
          loadFeedbacks(pagination.current - 1, pagination.pageSize);
        }}
      />
    </div>
  );
};

export default Feedbacks;
