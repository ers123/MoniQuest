
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  const triggerSkipWaiting = (worker?: ServiceWorker | null) => {
    if (!worker) return;
    const sendMessage = () => worker.postMessage({ type: 'SKIP_WAITING' });
    if (worker.state === 'installed') {
      sendMessage();
    } else {
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed') {
          sendMessage();
        }
      });
    }
  };

  window.addEventListener('load', () => {
    const baseUrl = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.BASE_URL || '/';
    const swUrl = new URL('sw.js', window.location.origin + baseUrl).href;

    navigator.serviceWorker
      .register(swUrl, { scope: baseUrl })
      .then(registration => {
        triggerSkipWaiting(registration.waiting);
        registration.addEventListener('updatefound', () => {
          triggerSkipWaiting(registration.installing);
        });
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  });

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}
