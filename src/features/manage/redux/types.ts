import {
  AsyncDataBase,
  AsyncOffsetPageListBase,
  AsyncListBase,
} from '../../shared';

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

export interface PostTopic {
  id: number;
  title: string;
  topicCategoryId: number;
  topicCategoryTitle: string;
}

export interface PostTopicCategory {
  id: number;
  title: string;
  topics: PostTopic[];
}

export interface PostTopicForm {
  title: string;
  topicCategoryId: number;
}

export interface PostTopicCategoryForm {
  title: string;
}

export interface UpdatePostTopicForm {
  id: number;
  title: string;
}

export interface UpdatePostTopicCategoryForm {
  id: number;
  title: string;
}

export interface PetBreed {
  id: number;
  categoryId: number;
  category: string;
  name: string;
}

export interface PetCategory {
  id: number;
  name: string;
  petBreeds: PetBreed[];
}

export interface PetBreedForm {
  categoryId: number;
  name: string;
}

export interface UpdatePetBreedForm {
  id: number;
  categoryId: number;
  name: string;
}

//city
export interface City {
  id: number;
  name: string;
  prefectureName: string;
  prefectureId: number;
}

export interface Prefecture {
  id: number;
  name: string;
  cities: City[];
}

export interface CityForm {
  prefectureId: number;
  name: string;
}

export interface UpdateCityForm {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  bio: string;
  photo: string | null;
}

export interface UserDetail extends User {
  restrictExpiration: number | null;
}

export interface Restriction {
  id: number;
  participatorId: number;
  expiration: number;
  reason: string;
}

export interface RestrictionForm {
  participatorId: number;
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

  topicCategories: AsyncListBase<PostTopicCategory>;
  createTopic: AsyncDataBase<PostTopic>;
  createTopicCategory: AsyncDataBase<PostTopicCategory>;
  updateTopic: AsyncDataBase<PostTopic>;
  updateTopicCategory: AsyncDataBase<PostTopicCategory>;
  removeTopic: AsyncDataBase<PostTopic>;
  removeTopicCategory: AsyncDataBase<PostTopicCategory>;

  petCategories: AsyncListBase<PetCategory>;
  createPetBreed: AsyncDataBase<PetBreed>;
  updatePetBreed: AsyncDataBase<PetBreed>;

  prefectures: AsyncListBase<Prefecture>;
  createCity: AsyncDataBase<City>;
  updateCity: AsyncDataBase<City>;

  users: AsyncOffsetPageListBase<User>;
  userDetail: AsyncDataBase<UserDetail>;
  createRestriction: AsyncDataBase<Restriction>;
  removeRestriction: AsyncDataBase<Restriction>;
}
