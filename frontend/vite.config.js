import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the React frontend.
// The proxy allows the dev server to forward API requests to the backend.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/generate-diagram': 'http://localhost:8000',
    },
  },
});
