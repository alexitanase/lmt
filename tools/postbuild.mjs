/**
 * Post-build step: copy lmt.umd.js → lmt.min.js and lmt.umd.js.map →
 * lmt.min.js.map so CDN consumers can use the conventional `.min.js`
 * URL. Both files are byte-identical to the UMD bundle (already
 * minified by esbuild during Vite's lib build).
 */
import { copyFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, '..', 'dist');

await copyFile(resolve(dist, 'lmt.umd.js'), resolve(dist, 'lmt.min.js'));
await copyFile(
  resolve(dist, 'lmt.umd.js.map'),
  resolve(dist, 'lmt.min.js.map'),
);

const { size } = await stat(resolve(dist, 'lmt.min.js'));
console.log(`[postbuild] dist/lmt.min.js  ${(size / 1024).toFixed(2)} KB`);
