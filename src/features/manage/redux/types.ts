import { AsyncDataBase, AsyncOffsetPageListBase } from '../../shared';

export type DisplayImage = {
  id: number;
  url: string;
  width: number;
  height: number;
};

export interface Participator {
  id: number;
  name: string;
  photo: string;
}

export interface Report {
  id: number;
  reportCount: number;
  lastReporterId: number;
  lastReason: string;
  entityId: number;
  entityType: 'POST' | 'QUESTION' | 'ANSWER';
  status: 'CREATED' | 'DONE' | 'RETAIN';
  lastReporter: Participator;
}

export interface ReportDetail extends Report {
  entity: object;
}

export interface Post {
  id: number;
  relatePetId: number | null;
  content: string;
  viewCount: number;
  likeCount: number;
  collectCount: number;
  commentCount: number;
  createdDate: number;
  participator: Participator;
  images: DisplayImage[];
}

export interface Question {
  id: number;
  relatePetId: number | null;
  title: string;
  content: string;
  upvoteCount: number;
  answerCount: number;
  createdDate: number;
  participator: Participator;
  images: DisplayImage[];
}

export interface Answer {
  id: number;
  questionId: number;
  content: string;
  upvoteCount: number;
  commentCount: number;
  createdDate: number;
  participator: Participator;
  images: DisplayImage[];
}

export interface Feedback {
  id: number;
  content: string;
  reporter: Participator;
}

export interface SystemNotification {
  id: number;
  title: string;
  content: string;
  createdDate: number;
}

export interface SystemNotificationForm {
  title: string;
  content: string;
}

export interface Document {
  id: number;
  documentKey: string;
  content: string;
}

export interface ManageState {
  reports: AsyncOffsetPageListBase<Report>;
  reportDetail: AsyncDataBase<ReportDetail>;

  removePost: AsyncDataBase<object>;
  removeQuestion: AsyncDataBase<object>;
  removeAnswer: AsyncDataBase<object>;

  feedbacks: AsyncOffsetPageListBase<Feedback>;

  systemNotifications: AsyncOffsetPageListBase<SystemNotification>;
  createSystemNotification: AsyncDataBase<SystemNotification>;
  removeSystemNotification: AsyncDataBase<SystemNotification>;
  updateSystemNotification: AsyncDataBase<SystemNotification>;

  userAgreement: AsyncDataBase<Document>;
  privacyAgreement: AsyncDataBase<Document>;
  updateDocument: AsyncDataBase<Document>;
}
