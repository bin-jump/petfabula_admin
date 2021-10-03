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
  useLoadPetCategories,
  useCreatePetBreed,
  useUpdatePetBreed,
  PetCategory,
  PetBreed,
} from '../redux';
import { useDidUpdateEffect, PendingModal } from '../../shared';

type CreateUpdateBreedContent = {
  id?: number | null;
  name: string;
  categoryId: number;
  category: string;
};

const makeBreedData = (categories: PetCategory[]) => {
  const res: PetBreed[] = [];

  for (const c of categories) {
    for (const t of c.petBreeds) {
      res.push(t);
    }
  }

  return res;
};

const CreateUpdateBreed = ({
  content,
  handleCancel,
}: {
  content: CreateUpdateBreedContent | null;
  handleCancel: () => void;
}) => {
  const [petBreed, setPetBreed] = useState(content);
  const {
    createPetBreed,
    pending: updatePending,
    result: updateResult,
  } = useCreatePetBreed();
  const {
    updatePetBreed,
    pending: createPending,
    result: createResult,
  } = useUpdatePetBreed();

  const show = petBreed ? true : false;

  useEffect(() => {
    setPetBreed(content);
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
          typeof petBreed?.id == 'undefined'
            ? 'Create Breed'
            : `Update Breed ID: ${petBreed?.id}`
        }
        visible={show}
        onCancel={handleCancel}
        onOk={() => {
          if (petBreed) {
            if (typeof petBreed?.id == 'number') {
              updatePetBreed({ ...petBreed, id: petBreed.id });
            } else {
              createPetBreed(petBreed);
            }
          }
        }}
      >
        {petBreed ? (
          <div>
            <div
              style={{ marginBottom: 16 }}
            >{`Category: [${petBreed.category}] (${petBreed.categoryId})`}</div>
            <Input
              capture="a"
              placeholder="Name"
              value={petBreed.name}
              onChange={(e) => {
                setPetBreed({ ...petBreed, name: e.target.value });
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

const PetBreeds = () => {
  const [breed, setBreed] = useState(null);
  const { loadPetCategories, petCategories, pending } = useLoadPetCategories();

  useEffect(() => {
    loadPetCategories();
  }, []);

  const petBreeds = makeBreedData(petCategories);
  const petCats = petCategories.map((item) => item.name);

  const handleBreedClose = () => {
    setBreed(null);
  };

  const categoryColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'BreedNumber',
      dataIndex: 'BreedNumber',
      key: 'BreedNumber',
      render: (text, category: PetCategory) => (
        <p>{category.petBreeds.length}</p>
      ),
    },

    {
      title: 'AddTopic',
      dataIndex: 'addTopic',
      key: 'addTopic',
      render: (text, category: PetCategory) => (
        <Button
          onClick={() => {
            setBreed({
              name: '',
              categoryId: category.id,
              category: category.name,
            });
          }}
        >
          Add Breed
        </Button>
      ),
    },
  ];

  const breedColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name, 'ja'),
      ellipsis: true,
    },
    {
      title: 'categoryId',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      filters: petCats.map((item) => ({
        text: item,
        value: item,
      })),
      onFilter: (value, record) => record.category == value,
      //   sorter: (a, b) => a.category > b.category,
      //   ellipsis: true,
    },
    {
      title: 'opertaion',
      dataIndex: 'opertaion',
      render: (_, record) => (
        <div>
          <Typography.Link
            onClick={() => {
              setBreed({
                ...record,
                categoryId: record.categoryId,
                category: record.category,
              });
            }}
          >
            Edit
          </Typography.Link>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <CreateUpdateBreed handleCancel={handleBreedClose} content={breed} />
      <Table
        pagination={{ pageSize: 10000 }}
        rowKey={(item) => item.id}
        columns={categoryColumns}
        dataSource={petCategories}
        loading={pending}
      />

      <Table
        pagination={{ pageSize: 10000 }}
        rowKey={(item) => item.id}
        columns={breedColumns}
        dataSource={petBreeds}
        loading={pending}
      />
    </div>
  );
};

export default PetBreeds;
