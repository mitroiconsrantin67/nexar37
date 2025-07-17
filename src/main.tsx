import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initIntegrityCheck } from './lib/footerProtection';
import { reloadAllData } from './lib/appData';
import { initIntegrityCheck } from './lib/footerProtection';
import { reloadAllData } from './lib/appData';
import './index.css';

// Inițializăm verificarea integrității aplicației
initIntegrityCheck();

// Reîncărcăm datele din baza de date
reloadAllData();

// Inițializăm verificarea integrității aplicației
initIntegrityCheck();

// Reîncărcăm datele din baza de date
reloadAllData();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
