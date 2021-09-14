import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Divider,
  Card,
  Image,
  Popconfirm,
  Typography,
  Modal,
  Spin,
} from 'antd';
import {
  useLoadReportDetail,
  ReportDetail,
  Post,
  Question,
  Answer,
  useRemovePost,
  useRemoveQestion,
  useRemoveAnswer,
} from '../redux';
import { UserField, useDidUpdateEffect, PendingModal } from '../../shared';

const { Title } = Typography;

interface RouteParams {
  postId: number;
}

const PostItem = ({ post }: { post: Post }) => {
  return (
    <>
      <UserField user={post.participator} />
      <Divider />
      <p>{post.content}</p>
      <Image.PreviewGroup>
        {post.images.map((item) => (
          <Image
            wrapperStyle={{ margin: 8 }}
            placeholder
            key={item.url}
            width={200}
            height={200}
            src={item.url}
            // fallback={fallback}
          />
        ))}
      </Image.PreviewGroup>
    </>
  );
};

const QuestionItem = ({ question }: { question: Question }) => {
  return (
    <>
      <UserField user={question.participator} />
      <Divider />
      <h4>{question.title}</h4>
      <p>{question.content}</p>
      <Image.PreviewGroup>
        {question.images.map((item) => (
          <Image
            wrapperStyle={{ margin: 8 }}
            placeholder
            key={item.url}
            width={200}
            height={200}
            src={item.url}
            // fallback={fallback}
          />
        ))}
      </Image.PreviewGroup>
    </>
  );
};

const AnswerItem = ({ answer }: { answer: Answer }) => {
  return (
    <>
      <UserField user={answer.participator} />
      <Divider />
      <p>{answer.content}</p>
      <Image.PreviewGroup>
        {answer.images.map((item) => (
          <Image
            wrapperStyle={{ margin: 8 }}
            placeholder
            key={item.url}
            width={200}
            height={200}
            src={item.url}
            // fallback={fallback}
          />
        ))}
      </Image.PreviewGroup>
    </>
  );
};

const EntityItem = ({ report }: { report: ReportDetail }) => {
  if (report.entityType == 'POST') {
    return <PostItem post={report.entity as Post} />;
  }
  if (report.entityType == 'QUESTION') {
    return <QuestionItem question={report.entity as Question} />;
  }
  if (report.entityType == 'ANSWER') {
    return <AnswerItem answer={report.entity as Answer} />;
  }
};

const ReportDetial = () => {
  const params = useParams<RouteParams>();
  const reportId = params.reportId;
  const { loadReportDetail, reportDetail, pending } = useLoadReportDetail();
  const {
    removePost,
    pending: removePostPending,
    result: removePostResult,
  } = useRemovePost();
  const {
    removeQuestion,
    pending: removeQuestionPending,
    result: removeQuestionResult,
  } = useRemoveQestion();
  const {
    removeAnswer,
    pending: removeAnswerPending,
    result: removeAnswerResult,
  } = useRemoveAnswer();
  const history = useHistory();

  useEffect(() => {
    loadReportDetail(reportId);
  }, [reportId]);

  useDidUpdateEffect(() => {
    if (removePostResult) {
      history.push('/manage');
    }
  }, [removePostResult]);

  useDidUpdateEffect(() => {
    if (removeQuestionResult) {
      history.push('/manage');
    }
  }, [removeQuestionResult]);

  useDidUpdateEffect(() => {
    if (removeAnswerResult) {
      history.push('/manage');
    }
  }, [removeAnswerResult]);

  const confirmDelete = (e) => {
    if (reportDetail) {
      if (reportDetail.entityType == 'POST') {
        removePost(reportDetail.entityId);
      } else if (reportDetail.entityType == 'QUESTION') {
        removeQuestion(reportDetail.entityId);
      } else if (reportDetail.entityType == 'ANSWER') {
        removeAnswer(reportDetail.entityId);
      }
    }
  };

  return (
    <div style={{ background: '#fff', marginTop: 16 }}>
      <div style={{ paddingLeft: 16, paddingTop: 8 }}>
        <h3>
          {reportDetail
            ? `Report entity:  ${reportDetail?.entityType}  ${reportDetail?.entityId}`
            : null}
        </h3>
      </div>
      <Divider />

      <PendingModal
        pending={
          removePostPending || removeAnswerPending || removeQuestionPending
        }
      />

      {reportDetail ? (
        <div style={{ paddingLeft: 16, paddingTop: 8 }}>
          <Title level={5}>{`Last Report Infomation`}</Title>
          <UserField user={reportDetail.lastReporter} />
          <Typography>{`reason: ${reportDetail.lastReason}`}</Typography>
        </div>
      ) : null}
      <Divider />

      <Card
        title={
          reportDetail
            ? `${reportDetail.entityType},  id: ${reportDetail.entityId}`
            : null
        }
        loading={pending}
        extra={
          <Popconfirm
            title="Delete?"
            onConfirm={confirmDelete}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        }
        style={{ margin: 20 }}
      >
        {reportDetail ? <EntityItem report={reportDetail} /> : null}
        {!pending && !reportDetail ? <div>Report not found</div> : null}
        {!pending && reportDetail && !reportDetail.entity ? (
          <div>Entity not found</div>
        ) : null}
      </Card>
    </div>
  );
};

export default ReportDetial;
