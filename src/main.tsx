// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import './index.css';
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
