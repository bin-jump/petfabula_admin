import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  Tag,
  Space,
  Typography,
  Popconfirm,
  Modal,
  Input,
  Button,
} from 'antd';
import {
  useLoadTopicCategories,
  useUpdateTopic,
  useUpdateTopicCategories,
  useCreateTopicCategories,
  useCreateTopic,
  useRemoveTopic,
  useRemoveTopicCategory,
  PostTopic,
  PostTopicCategory,
} from '../redux';
import { useDidUpdateEffect, PendingModal } from '../../shared';

type CreateUpdateTopicCategoryContent = {
  id?: number | null;
  title: string;
};

type CreateUpdateTopicContent = {
  id?: number | null;
  title: string;
  topicCategoryId: number;
  topicCategory: string;
};

const makeTopicData = (categories: PostTopicCategory[]) => {
  const res: PostTopic[] = [];

  for (const c of categories) {
    for (const t of c.topics) {
      res.push(t);
    }
  }

  return res;
};

const CreateUpdateTopicCategory = ({
  content,
  handleCancel,
}: {
  content: CreateUpdateTopicCategoryContent | null;
  handleCancel: () => void;
}) => {
  const [category, setCategory] = useState(content);
  const {
    updateTopicCategory,
    pending: updatePending,
    result: updateResult,
  } = useUpdateTopicCategories();
  const {
    createTopicCategory,
    pending: createPending,
    result: createResult,
  } = useCreateTopicCategories();

  const show = category ? true : false;

  useEffect(() => {
    setCategory(content);
  }, [content]);

  useDidUpdateEffect(() => {
    if (updateResult) {
      handleCancel();
    }
  }, [updateResult]);

  useDidUpdateEffect(() => {
    if (createResult) {
      handleCancel();
    }
  }, [createResult]);

  return (
    <div>
      <Modal
        confirmLoading={updatePending || createPending}
        title={
          typeof category?.id == 'undefined'
            ? 'Create TopicCategory'
            : `Update TopicCategory ID: ${category?.id}`
        }
        visible={show}
        onCancel={handleCancel}
        onOk={() => {
          if (category) {
            if (typeof category?.id == 'number') {
              updateTopicCategory({ ...category, id: category.id });
            } else {
              createTopicCategory(category);
            }
          }
        }}
      >
        {category ? (
          <div>
            <Input
              capture="a"
              placeholder="Title"
              value={category.title}
              onChange={(e) => {
                setCategory({ ...category, title: e.target.value });
              }}
            />

            {/* <div style={{ color: 'red' }}>
              {error ? JSON.stringify(error) : null}
            </div> */}
          </div>
        ) : (
          <div>no object to edit</div>
        )}
      </Modal>
    </div>
  );
};

const CreateUpdateTopic = ({
  content,
  handleCancel,
}: {
  content: CreateUpdateTopicContent | null;
  handleCancel: () => void;
}) => {
  const [topic, setTopic] = useState(content);
  const {
    updateTopic,
    pending: updatePending,
    result: updateResult,
  } = useUpdateTopic();
  const {
    createTopic,
    pending: createPending,
    result: createResult,
  } = useCreateTopic();

  const show = topic ? true : false;

  useEffect(() => {
    setTopic(content);
  }, [content]);

  useDidUpdateEffect(() => {
    if (updateResult) {
      handleCancel();
    }
  }, [updateResult]);

  useDidUpdateEffect(() => {
    if (createResult) {
      handleCancel();
    }
  }, [createResult]);

  return (
    <div>
      <Modal
        confirmLoading={updatePending || createPending}
        title={
          typeof topic?.id == 'undefined'
            ? 'Create Topic'
            : `Update Topic ID: ${topic?.id}`
        }
        visible={show}
        onCancel={handleCancel}
        onOk={() => {
          if (topic) {
            if (typeof topic?.id == 'number') {
              updateTopic({ ...topic, id: topic.id });
            } else {
              createTopic(topic);
            }
          }
        }}
      >
        {topic ? (
          <div>
            <div
              style={{ marginBottom: 16 }}
            >{`Category: [${topic.topicCategory}] (${topic.topicCategoryId})`}</div>
            <Input
              capture="a"
              placeholder="Title"
              value={topic.title}
              onChange={(e) => {
                setTopic({ ...topic, title: e.target.value });
              }}
            />

            {/* <div style={{ color: 'red' }}>
              {error ? JSON.stringify(error) : null}
            </div> */}
          </div>
        ) : (
          <div>no object to edit</div>
        )}
      </Modal>
    </div>
  );
};

const PostTopics = () => {
  const [category, setCategory] = useState(null);
  const [topic, setTopic] = useState(null);

  const { loadTopicCategories, topicCategories, pending } =
    useLoadTopicCategories();
  const { removeTopic, pending: removeTopicPending } = useRemoveTopic();
  const { removeTopicCategory, pending: removeTopicCategoryPending } =
    useRemoveTopicCategory();

  useEffect(() => {
    loadTopicCategories();
  }, []);

  const topics = makeTopicData(topicCategories);

  const handleCategoryClose = () => {
    setCategory(null);
  };

  const handleTopicClose = () => {
    setTopic(null);
  };

  const categoryColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'TopicNumber',
      dataIndex: 'reporter',
      key: 'reporter',
      render: (text, category: PostTopicCategory) => (
        <p>{category.topics.length}</p>
      ),
    },
    {
      title: 'opertaion',
      dataIndex: 'opertaion',
      render: (_, record) => (
        <div>
          <Typography.Link
            onClick={() => {
              setCategory(record);
            }}
          >
            Edit
          </Typography.Link>

          <Popconfirm
            style={{}}
            title="Delete?"
            onConfirm={() => {
              removeTopicCategory(record.id);
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
    {
      title: 'AddTopic',
      dataIndex: 'addTopic',
      key: 'addTopic',
      render: (text, category: PostTopicCategory) => (
        <Button
          onClick={() => {
            setTopic({
              title: '',
              topicCategoryId: category.id,
              topicCategory: category.title,
            });
          }}
        >
          Add Topic
        </Button>
      ),
    },
  ];

  const topicColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'topicCategoryId',
      dataIndex: 'topicCategoryId',
      key: 'topicCategoryId',
    },
    {
      title: 'topicCategoryTitle',
      dataIndex: 'topicCategoryTitle',
      topicCategoryTitle: 'topicCategoryTitle',
    },
    {
      title: 'opertaion',
      dataIndex: 'opertaion',
      render: (_, record) => (
        <div>
          <Typography.Link
            onClick={() => {
              setTopic({
                ...record,
                topicCategoryId: record.topicCategoryId,
                topicCategory: record.topicCategoryTitle,
              });
            }}
          >
            Edit
          </Typography.Link>

          <Popconfirm
            style={{}}
            title="Delete?"
            onConfirm={() => {
              removeTopic(record.id);
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
      <CreateUpdateTopicCategory
        handleCancel={handleCategoryClose}
        content={category}
      />
      <CreateUpdateTopic handleCancel={handleTopicClose} content={topic} />

      <PendingModal
        pending={removeTopicCategoryPending || removeTopicPending}
      />

      <Button
        onClick={() => {
          setCategory({ title: '' });
        }}
      >
        Create
      </Button>
      <Table
        pagination={{ pageSize: 10000 }}
        rowKey={(item) => item.id}
        columns={categoryColumns}
        dataSource={topicCategories}
        loading={pending}
      />

      <Table
        pagination={{ pageSize: 10000 }}
        rowKey={(item) => item.id}
        columns={topicColumns}
        dataSource={topics}
        loading={pending}
      />
    </div>
  );
};

export default PostTopics;
