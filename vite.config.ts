import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.tsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-tsx',
                    setup(build) {
                        build.onLoad(
                            { filter: /src\\.*\.js$/ },
                            async (args) => ({
                                loader: 'tsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            })
                        );
                    },
                },
            ],
        },
    },
    plugins: [
        svgr(),
        react(),
        {
            name: 'copy-files',
            writeBundle() {
                // يمكنك استخدام fs-extra أو أي مكتبة أخرى لنسخ الملفات
                // هذا مثال توضيحي فقط
                // import { copyFileSync } from 'fs';
                // copyFileSync('public/_redirects', 'dist/_redirects');
                // copyFileSync('public/200.html', 'dist/200.html');
            }
        }
    ],
});