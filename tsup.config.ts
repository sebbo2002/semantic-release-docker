import { defineConfig } from 'tsup';
import fs from 'fs';

const pkg = JSON.parse(
    fs.readFileSync('./package.json', 'utf-8')
);

export default defineConfig({
    clean: true,
    entry: [
        'src/lib/index.ts',
        'src/bin/cli.ts',
        'src/bin/start.ts'
    ],
    esbuildOptions(options) {
        options.banner = {
            js: 'import { createRequire as topLevelCreateRequire } from \'module\';' +
                'const require = topLevelCreateRequire(import.meta.url);'
        };
    },
    external: [...Object.keys(pkg.devDependencies), 'semantic-release'],
    noExternal: Object.keys(pkg.dependencies),
    format: ['esm'],
    dts: true,
    shims: true,
    sourcemap: true,
    minify: true
});
