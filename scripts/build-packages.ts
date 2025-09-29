import shell from 'shelljs';

import { logDebug, logInfo } from './utils/console';

async function buildPackages() {
  const start = performance.now();
  logDebug(`Building packages...`);

  shell.exec('pnpm compile:packages');

  const results = await Promise.allSettled([
    shell.exec('pnpm build:packages:esm'),
    shell.exec('pnpm build:packages:cjs'),
    shell.exec('pnpm build:css'),
  ]);

  const rejectedResults = results.filter(result => result.status === 'rejected');

  if (rejectedResults.length > 0) {
    console.info('Failed to build packages');
    console.info(rejectedResults.map(result => result.reason).join('\n'));
    shell.exit(1);
  }

  const end = performance.now();
  logInfo(`Total build time: ${(end - start) / 1000} seconds.`);
}

buildPackages();
