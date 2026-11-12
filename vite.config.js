import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages เปิดเว็บที่ /Cookverse-Thai/ — ตั้ง BASE_PATH ตอน build ใน workflow
// ถ้าไม่ตั้ง (npm run dev หรือ Netlify) จะใช้ / ตามเดิม
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
});
