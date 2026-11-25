import fs from 'fs';
import { defineConfig } from 'tsdown';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

export default defineConfig({
    deps: {
        alwaysBundle: Object.keys(pkg.dependencies),
        neverBundle: [...Object.keys(pkg.devDependencies), 'semantic-release'],
    },
    dts: true,
    entry: ['src/lib/index.ts'],
    esbuildOptions(options) {
        options.banner = {
            js:
                "import { createRequire as topLevelCreateRequire } from 'module';" +
                'const require = topLevelCreateRequire(import.meta.url);',
        };
    },
    format: ['esm'],
    minify: true,
    shims: true,
    sourcemap: true,
});
