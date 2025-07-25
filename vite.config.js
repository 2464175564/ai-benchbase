import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/ai-benchbase-frontend/',
  server: {
    port: 5173,
    open: true,
    proxy: {
      // 移除原有的API代理，因为现在直接使用Supabase
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})