// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // ← Import BrowserRouter

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ← Wrap App in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
