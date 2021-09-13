import * as React from 'react';
import { Provider } from 'react-redux';
import i18n from './config';
import { I18nextProvider } from 'react-i18next';

const LocaleProvider: React.FC<{}> = ({ children }) => {
  return (
    <>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </>
  );
};

export default LocaleProvider;
