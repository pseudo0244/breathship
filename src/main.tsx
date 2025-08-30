import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { validateConfig } from './config/api';
import { testAPIConnections } from './utils/testAPI';
import { debugAPIConnection } from './utils/debugAPI';

// Validate API configuration on app start
validateConfig();

// Test API connections in development
if (import.meta.env.DEV) {
  testAPIConnections();
  debugAPIConnection();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
