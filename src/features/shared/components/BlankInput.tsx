import * as React from 'react';
import { FieldProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { Input, Form } from 'antd';

const FormItem = Form.Item;

type Props = FieldProps<any> & {
  prefix: React.ReactNode;
  placeholder?: string;
  autoFocus?: boolean;
  label?: string;
  inputType?: 'input' | 'number' | 'password';
  style?: any;
};

const InputField = ({
  field: { onChange, ...field },
  form: { touched, errors, values, setFieldValue, handleBlur },
  placeholder,
  autoFocus,
  label,
  inputType,
  style,
  ...props
}: Props) => {
  const { t } = useTranslation();

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setFieldValue(field.name, text);
  };

  const errorMsg =
    touched[field.name] && errors[field.name]
      ? (errors[field.name] as string)
      : undefined;

  const Comp = inputType == 'password' ? Input.Password : Input;
  // const multilineH = multilineHeight ? multilineHeight : 140;
  return (
    <FormItem
      label={label}
      help={errorMsg}
      validateStatus={errorMsg ? 'error' : undefined}
    >
      <Comp {...field} {...props} onChange={onChangeText} />
    </FormItem>
  );
};
export default InputField;
