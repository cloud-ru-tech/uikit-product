import { exec, ExecCallback, exit } from 'shelljs';

import { installIconsPackage } from './utils/installIconsPackage';

const revertIconsPackage = installIconsPackage();

const execCallback: ExecCallback = code => {
  revertIconsPackage?.();
  exit(code);
};

exec('vitest run', execCallback);
