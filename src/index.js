import React from 'react';
import ReactDOM from 'react-dom/client';
import {NextUIProvider} from "@nextui-org/react";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App/>
    </NextUIProvider>
  </React.StrictMode>
);
