import { defineConfig } from 'vite' 
import react from '@vitejs/plugin-react' 
import path from 'path' 
 
export default defineConfig({ 
  plugins: [react()], 
  server: { 
    port: 5173, 
    host: true, 
    hmr: { port: 24678 } 
  }, 
  build: { 
    target: 'esnext', 
    minify: 'esbuild', 
    rollupOptions: { 
      output: { 
        manualChunks: { 
          vendor: ['react', 'react-dom'], 
          router: ['react-router-dom'] 
        } 
      } 
    } 
  }, 
  resolve: { 
    alias: { 
      '@': path.resolve(__dirname, './src') 
    } 
  } 
}) 
