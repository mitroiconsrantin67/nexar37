import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initIntegrityCheck } from './lib/footerProtection';
import './index.css';

// Inițializăm verificarea integrității aplicației
initIntegrityCheck();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
