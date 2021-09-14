import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useLoadReports, Participator, Report } from '../redux';

const PAGE_SIZE = 10;

const resolveEntityLink = (record: Report) => {
  if (record.entityType == 'POST') {
    return `/manage/report/${record.id}`;
  }
  return '';
};

const columns = [
  {
    title: 'entityType',
    dataIndex: 'entityType',
    key: 'entityType',
    render: (text, record) => (
      <Link
        to={{
          pathname: resolveEntityLink(record),
          report: record,
        }}
        // params={{ report: record }}
      >{`${text}(${record.entityId})`}</Link>
    ),
  },
  {
    title: 'lastReason',
    dataIndex: 'lastReason',
    key: 'lastReason',
  },
  {
    title: 'reportCount',
    dataIndex: 'reportCount',
    key: 'reportCount',
  },
  {
    title: 'lastReporter',
    dataIndex: 'lastReporter',
    key: 'lastReporter',
    render: (reporter: Participator) => (
      <Typography>{reporter.name}</Typography>
    ),
  },
];

const Reports = () => {
  const { loadReports, reports, page, size, total, pending } = useLoadReports();

  useEffect(() => {
    if (!size) {
      loadReports(0, PAGE_SIZE);
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
        dataSource={reports}
        pagination={pagination}
        loading={pending}
        onChange={(pagination) => {
          loadReports(pagination.current - 1, pagination.pageSize);
        }}
      />
    </div>
  );
};

export default Reports;
