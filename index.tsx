
import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import App from './App';

const resolveBaseUrl = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  const configuredBase = metaEnv.BASE_URL ?? '/';
  const normalizedBase = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;

  try {
    return new URL(normalizedBase, window.location.href);
  } catch (error) {
    console.warn('Base URL resolution failed, defaulting to current directory.', error);
    return new URL('./', window.location.href);
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
    const baseUrl = resolveBaseUrl();

    if (!baseUrl) {
      return;
    }

    const swUrl = new URL('sw.js', baseUrl).toString();
    const scopeUrl = baseUrl.href.endsWith('/') ? baseUrl.href : `${baseUrl.href}/`;

    navigator.serviceWorker
      .register(swUrl, { scope: scopeUrl })
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

  try {
    registerServiceWorker();
  } catch (error) {
    console.warn('Service worker registration skipped.', error);
  }
};

startApp();
