import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { i18nService } from './services/i18nService';
import { settingsService } from './services/settingsService';

settingsService.applyTheme();
i18nService.applyLanguage();

createRoot(
  document.getElementById('root')!,
).render(
  <StrictMode>
    <App />
  </StrictMode>,
);