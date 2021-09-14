import React, { useEffect, useState } from 'react';
import { Table, Tag, Popconfirm, Typography, Spin, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';

const PendingModal = ({ pending }: { pending: boolean }) => {
  return (
    <Modal visible={pending}>
      <Spin size="large" />
      <p>Please wait...</p>
    </Modal>
  );
};

export default PendingModal;
