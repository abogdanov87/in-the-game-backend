import { readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const uiDir = resolve(process.cwd(), '../../ui');
const buildDir = resolve(uiDir, 'build');
const files = await readdir(buildDir);

const mainAssets = files
  .filter((name) => /\.(js|css)$/.test(name))
  .sort((a, b) => {
    const order = { css: 0, js: 1 };
    return order[a.split('.').pop()] - order[b.split('.').pop()];
  })
  .map((name) => ({
    name,
    publicPath: `/static/${name}`,
    path: `build/${name}`,
  }));

await writeFile(
  resolve(uiDir, 'webpack-stats.json'),
  JSON.stringify({
    status: 'done',
    chunks: {
      main: mainAssets,
    },
    publicPath: '/static/',
  }),
);
