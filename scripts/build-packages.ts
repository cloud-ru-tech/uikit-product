import shell from 'shelljs';

import { logDebug, logError, logInfo } from './utils/console';
import { execAsync } from './utils/execAsync';

async function buildAllPackages() {
  const start = performance.now();
  logDebug(`Building packages...`);

  shell.exec('pnpm compile:packages');

  try {
    // ESM до CJS: `types` пакетов ведут в dist/esm, оттуда CJS-сборка читает d.ts зависимостей.
    await execAsync('pnpm build:packages:esm');
    await Promise.all([execAsync('pnpm build:packages:cjs'), execAsync('pnpm build:css')]);
  } catch (error) {
    logError('Failed to build packages');
    console.info((error as { stdout?: string }).stdout);
    shell.exit(1);
  }

  logInfo(`Total build time: ${(performance.now() - start) / 1000} seconds.`);
}

buildAllPackages();
