import * as React from 'react';
import 'antd/dist/antd.css';
import { Routes } from './routes';
import { StoreProvider } from './store';
import { LocaleProvider } from './providers';

const App = () => {
  return (
    <div>
      <LocaleProvider>
        <StoreProvider>
          <Routes />
        </StoreProvider>
      </LocaleProvider>
    </div>
  );
};

export default App;
