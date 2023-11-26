import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

/**
 * Vite configuration
 * @see ( https://vitejs.dev/config/ )
 */
export default defineConfig( {
    server: {
        port: 2300,
    },
    build : {
        lib : {
            entry : path.resolve( __dirname , './src/index.ts' ),
            name : 'archivist-ui',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        sourcemap: true,
        emptyOutDir: true,
    },
    plugins: [react(), dts()],
} )