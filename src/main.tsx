import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { validateConfig } from './config/api';
import { testContentAPI } from './utils/testAPI';
import { debugAPIConnection } from './utils/debugAPI';

// Validate API configuration on app start
validateConfig();

// Test API connections in development
if (import.meta.env.DEV) {
  // Test content API functionality
  testContentAPI().then(success => {
    console.log('Content API test result:', success ? '✅ Success' : '❌ Failed');
  }).catch(error => {
    console.error('Content API test error:', error);
  });
  
  // Debug API connection
  debugAPIConnection();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
