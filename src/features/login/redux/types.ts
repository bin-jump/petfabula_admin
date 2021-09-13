import { AsyncDataBase } from '../../shared';

export interface User {
  id: number;
  name: string;
  photo: string;
}

export interface EmailPasswordLoginForm {
  email: string;
  password: string;
}

export interface LoginState {
  currentUser: AsyncDataBase<User>;
  passwordLoginResult: AsyncDataBase<User>;
  logoutResult: AsyncDataBase<User>;
}
