import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const explicitBase = env.VITE_BASE_PATH;
    const repoBase = '/MoniQuest/';
    const fallbackBase = mode === 'production' ? repoBase : '/';
    const configuredBase = explicitBase || fallbackBase;
    const normalizedBase = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;

    return {
      base: normalizedBase,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
