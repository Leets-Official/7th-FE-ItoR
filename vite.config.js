import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
export default defineConfig({
    plugins: [react(), tailwindcss(), svgr()],
    server: {
        port: 3000,
        strictPort: true,
        proxy: {
            '/api': {
                target: 'https://blog.leets.land',
                changeOrigin: true,
                secure: true,
                rewrite: function (path) { return path.replace(/^\/api/, ''); },
                configure: function (proxy) {
                    proxy.on('proxyReq', function (proxyReq) {
                        proxyReq.setHeader('origin', 'https://blog.leets.land');
                        proxyReq.setHeader('referer', 'https://blog.leets.land/');
                    });
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
