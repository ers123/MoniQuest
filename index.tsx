
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const loadRuntimeConfig = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.__MONIQUEST_CONFIG__ = window.__MONIQUEST_CONFIG__ || {};
  const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const baseUrl = metaEnv?.BASE_URL || '/';

  try {
    const configUrl = new URL('config.json', window.location.origin + baseUrl).toString();
    const response = await fetch(configUrl, { cache: 'no-store' });

    if (response.ok) {
      const config = await response.json();
      if (config && typeof config === 'object') {
        window.__MONIQUEST_CONFIG__ = {
          ...window.__MONIQUEST_CONFIG__,
          ...(config as Record<string, unknown>),
        };
      }
    } else if (response.status !== 404) {
      console.warn('Failed to load runtime config:', response.status, response.statusText);
    }
  } catch (error) {
    console.warn('Runtime config fetch error:', error);
  }
};

const registerServiceWorker = () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

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
};

const startApp = async () => {
  await loadRuntimeConfig();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Could not find root element to mount to');
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  registerServiceWorker();
};

startApp();
