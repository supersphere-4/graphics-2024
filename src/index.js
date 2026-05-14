import React from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router';
import ReactDOM from 'react-dom/client';
import {NextUIProvider} from "@nextui-org/react";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
