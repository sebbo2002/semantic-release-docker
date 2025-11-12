import fs from 'fs';
import { defineConfig } from 'tsup';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

export default defineConfig({
    clean: true,
    dts: true,
    entry: ['src/lib/index.ts', 'src/bin/cli.ts', 'src/bin/start.ts'],
    esbuildOptions(options) {
        options.banner = {
            js:
                "import { createRequire as topLevelCreateRequire } from 'module';" +
                'const require = topLevelCreateRequire(import.meta.url);',
        };
    },
    external: [...Object.keys(pkg.devDependencies), 'semantic-release'],
    format: ['esm'],
    minify: true,
    noExternal: Object.keys(pkg.dependencies),
    shims: true,
    sourcemap: true,
});
