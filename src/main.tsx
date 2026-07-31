import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

// Disable browser's native automatic scroll restoration so Lenis + custom logic controls scroll
window.history.scrollRestoration = 'manual';

// On hard refresh (F5 / Ctrl+R) or opening website fresh:
// Clear any stored project scroll session so website ALWAYS maps to 0 (#home)
const perfNav = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
const isReload = perfNav.length > 0 && perfNav[0].type === 'reload';
const isNewVisit = perfNav.length > 0 && perfNav[0].type === 'navigate';

if (isReload || isNewVisit) {
  sessionStorage.removeItem('portfolio_project_scroll_y');
  sessionStorage.removeItem('portfolio_is_navigating');
  window.scrollTo(0, 0);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
