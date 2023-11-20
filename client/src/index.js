import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// context
import { AuthContextProvider } from './context/AuthContext';
import { PollContextProvider } from './context/PollContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PollContextProvider>
        <App />
      </PollContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
