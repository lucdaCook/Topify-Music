import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThemeContextProvider from './contexts/ThemeContext';
import CredentialsContextProvider from './contexts/CredentialsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <CredentialsContextProvider>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
      </CredentialsContextProvider>
  </React.StrictMode>
);
