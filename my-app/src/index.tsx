import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './ThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </React.StrictMode>
  </BrowserRouter>

);

