import * as React from 'react';
import { usePasswordLogin, EmailPasswordLoginForm } from '../redux';
import { Button, Typography } from 'antd';
import { Field, Formik, Form } from 'formik';
import { validEmailPasswordLoginFormSchema } from '../yupSchemas/loginSchema';
import { BlankInput, resolveResponseFormError } from '../../shared';

const Login = () => {
  const { login } = usePasswordLogin();
  const handleSubmit = (data: EmailPasswordLoginForm) => {
    login(data);
  };
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div style={{}}>
      <div
        style={{
          marginTop: 100,
          width: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography>LOGIN</Typography>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validEmailPasswordLoginFormSchema}
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={true}
          validateOnMount
        >
          {({ isSubmitting, errors, setErrors, setSubmitting, isValid }) => (
            <LoginFormContent
              {...{ isSubmitting, errors, setErrors, setSubmitting, isValid }}
            />
          )}
        </Formik>
      </div>
    </div>
  );
};

const LoginFormContent: React.FC<{
  setSubmitting: (isSubmitting: boolean) => void;
  isSubmitting: boolean;
  errors: any;
  setErrors: (errors: any) => void;
  isValid: boolean;
}> = ({ setErrors, setSubmitting, isValid }) => {
  const { error, pending } = usePasswordLogin();

  React.useEffect(() => {
    setErrors(resolveResponseFormError(error));
  }, [error]);

  React.useEffect(() => {
    setSubmitting(pending);
  }, [pending]);

  return (
    <Form>
      <Field name="email" placeholder="Email" component={BlankInput} />
      <Field
        name="password"
        placeholder="Password"
        component={BlankInput}
        inputType="password"
      />

      <div style={{ display: 'flex', marginTop: 30 }}>
        <Button
          style={{ margin: 'auto', width: 120 }}
          type="primary"
          shape="round"
          size="large"
          disabled={!isValid}
          loading={pending}
          htmlType="submit"
        >
          Login
        </Button>
      </div>
    </Form>
  );
};

export default Login;
