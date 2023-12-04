import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';

import { version } from './package.json';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
  },
  environment: {
    VERSION: version,
  },
};

export default config;
