import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
  useLoadPrefectures,
  useCreateCity,
  useUpdateCity,
  City,
  Prefecture,
} from '../redux';
import { useDidUpdateEffect, PendingModal } from '../../shared';

type CreateUpdateCityContent = {
  id?: number | null;
  name: string;
  prefectureId: number;
  prefectureName?: string;
};

const makeCityData = (prefectures: Prefecture[]) => {
  const res: City[] = [];

  for (const p of prefectures) {
    for (const c of p.cities) {
      res.push(c);
    }
  }

  return res;
};

const CreateUpdateCity = ({
  content,
  handleCancel,
}: {
  content: CreateUpdateCityContent | null;
  handleCancel: () => void;
}) => {
  const [city, setCity] = useState(content);
  const {
    createCity,
    pending: updatePending,
    result: updateResult,
  } = useCreateCity();
  const {
    updateCity,
    pending: createPending,
    result: createResult,
  } = useUpdateCity();

  const show = city ? true : false;

  useEffect(() => {
    setCity(content);
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
          typeof city?.id == 'undefined'
            ? 'Create City'
            : `Update City ID: ${city?.id}`
        }
        visible={show}
        onCancel={handleCancel}
        onOk={() => {
          if (city) {
            if (typeof city?.id == 'number') {
              updateCity({ ...city, id: city.id });
            } else {
              createCity(city);
            }
          }
        }}
      >
        {city ? (
          <div>
            <div
              style={{ marginBottom: 16 }}
            >{`Prefecture: [${city.prefectureName}] (${city.prefectureId})`}</div>
            <Input
              capture="a"
              placeholder="Name"
              value={city.name}
              onChange={(e) => {
                setCity({ ...city, name: e.target.value });
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

const Cities = () => {
  const [city, setCity] = useState<CreateUpdateCityContent>(null);
  const { loadPrefectures, prefectures, pending } = useLoadPrefectures();

  useEffect(() => {
    loadPrefectures();
  }, []);

  const cities = useMemo(() => makeCityData(prefectures), [prefectures]);
  const prefectureNames = prefectures.map((item) => item.name);

  const handleCityClose = () => {
    setCity(null);
  };

  const prefectureColumns = [
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
      title: 'CityNumber',
      dataIndex: 'CityNumber',
      key: 'CityNumber',
      render: (text, prefecture: Prefecture) => (
        <p>{prefecture.cities.length}</p>
      ),
    },
    {
      title: 'AddCity',
      dataIndex: 'AddCity',
      key: 'AddCity',
      render: (text, prefecture: Prefecture) => (
        <Button
          onClick={() => {
            setCity({
              name: '',
              prefectureId: prefecture.id,
              prefectureName: prefecture.name,
            });
          }}
        >
          Add City
        </Button>
      ),
    },
  ];

  const cityColumns = [
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
      title: 'prefectureId',
      dataIndex: 'prefectureId',
      key: 'prefectureId',
    },
    {
      title: 'prefectureName',
      dataIndex: 'prefectureName',
      key: 'prefectureName',
      filters: prefectureNames.map((item) => ({
        text: item,
        value: item,
      })),
      onFilter: (value, record) => record.prefectureName == value,
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
              setCity({
                ...record,
                prefectureId: record.prefectureId,
                prefectureName: record.prefectureName,
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
      <CreateUpdateCity handleCancel={handleCityClose} content={city} />

      <div>{`Total: ${prefectures.length}`}</div>
      <Table
        pagination={{ pageSize: 20 }}
        rowKey={(item) => item.id}
        columns={prefectureColumns}
        dataSource={prefectures}
        loading={pending}
      />

      <div>{`Total: ${cities.length}`}</div>
      <Table
        pagination={{ pageSize: 300 }}
        rowKey={(item) => item.id}
        columns={cityColumns}
        dataSource={cities}
        loading={pending}
      />
    </div>
  );
};

export default Cities;
