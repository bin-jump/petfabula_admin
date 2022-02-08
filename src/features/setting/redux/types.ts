import { AsyncDataBase } from '../../shared';

export type ChangePasswordForm = {
  password: string;
  newPassword: string;
};

export type ChangePasswordResult = {
  changed: boolean;
};

export interface SettingState {
  changePassword: AsyncDataBase<ChangePasswordResult>;
}
