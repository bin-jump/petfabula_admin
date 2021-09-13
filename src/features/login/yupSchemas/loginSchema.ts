import * as yup from 'yup';

const messageKey = {
  password: 'login.password',
  emailNotValid: 'login.email',
};

export const emaliValidation = yup
  .string()
  .trim()
  .email(messageKey.emailNotValid)
  .required(messageKey.emailNotValid);

export const passwordValidation = yup
  .string()
  .trim()
  .required(messageKey.password);

export const validEmailPasswordLoginFormSchema = yup.object().shape({
  email: emaliValidation,
  password: passwordValidation,
});
