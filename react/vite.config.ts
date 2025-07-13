import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '/',
	plugins: [react()],
	server: {
		open: true,
		port: 3000,
		host: 'localhost'
	},
	preview: {
		port: 3100,
		host: 'localhost'
	},
	resolve: {
		conditions: ['mui-modern', 'module', 'browser', 'development|production']
	},
	build: {
		outDir: 'build',
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true
		}
	}
});
