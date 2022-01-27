import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Avatar, Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  User,
  UserDetail,
  RestrictionForm,
  useLoadUserDetail,
  useCreateRestriction,
  useRemoveRestriction,
} from '../redux';
import { toFullTextDate, sizedUri, UserField } from '../../shared';

const { Meta } = Card;
const { Text, Link } = Typography;

interface RouteParams {
  userId: number;
}

const statusText = (time: number | undefined) => {
  if (time == 0) {
    return 'Permanert';
  }

  if (time == null) {
    return 'Not Set';
  }

  return toFullTextDate(time);
};

const RestrictionPart = ({ userDetail }: { userDetail: UserDetail | null }) => {
  const { createRestriction, pending: createPending } = useCreateRestriction();
  const { removeRestriction, pending: removePending } = useRemoveRestriction();

  return (
    <div
      style={{
        marginTop: 16,
        // justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Typography
        style={{ marginRight: 6 }}
      >{`Restriction Expire Time:`}</Typography>
      <Text type="warning" style={{ float: 'left', marginRight: 16 }}>
        {`${statusText(userDetail?.restrictExpiration)}`}
      </Text>

      {userDetail?.restrictExpiration == null && (
        <Button
          loading={createPending}
          onClick={() => {
            createRestriction({ participatorId: userDetail.id });
          }}
          type="primary"
        >
          Set Resitriciton
        </Button>
      )}

      {userDetail?.restrictExpiration != null && (
        <Button
          loading={removePending}
          onClick={() => {
            removeRestriction(userDetail.id);
          }}
          type="primary"
        >
          Remove Resitriciton
        </Button>
      )}
    </div>
  );
};

const UserDetailPage = () => {
  const params = useParams<RouteParams>();
  const userId = params.userId;

  const { loadUserDetail, pending, userDetail } = useLoadUserDetail();

  useEffect(() => {
    loadUserDetail(userId);
  }, [loadUserDetail, userId]);

  return (
    <div>
      <Card
        style={{ marginTop: 24 }}
        title={userDetail?.id == userId ? `ID: ${userId}` : ''}
        loading={pending || userDetail?.id != userId}
      >
        {userDetail && !userDetail?.hasOwnProperty('name') ? (
          <Text style={{ color: 'gray' }}>{'NOT FOUND'}</Text>
        ) : (
          <div>
            <Meta
              avatar={
                <Avatar
                  src={sizedUri(userDetail?.photo)}
                  icon={<UserOutlined />}
                />
              }
              title={userDetail?.name}
              description={userDetail?.bio}
            />
            <RestrictionPart userDetail={userDetail} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserDetailPage;
