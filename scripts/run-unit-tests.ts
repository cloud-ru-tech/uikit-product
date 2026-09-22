import shell from 'shelljs';

import { logError } from './utils/console';
import { prepareIconsPackage } from './utils/prepareIconsPackage';

prepareIconsPackage()
  .then(() => shell.exit(shell.exec('vitest run').code))
  .catch(error => {
    logError('Failed to prepare icons package');
    console.info((error as { stdout?: string }).stdout);
    shell.exit(1);
  });
