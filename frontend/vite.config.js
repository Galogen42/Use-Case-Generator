import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import react from '@vitejs/plugin-react';


export default defineConfig({
export default defineConfig({
  plugins: [react()],
  plugins: [react()],
  server: {
  server: {
    port: 5173,
    port: 5173,
    proxy: {
      '/generate-diagram': 'http://localhost:8000',
    },
  },
  },
});
});