import path from 'path';

import { exec, exit } from 'shelljs';

import { getChangedPackages } from './utils/getChangedPackages';
import { isMainBranch } from './utils/isMainBranch';

const { BROWSER } = process.env;

let changedPaths = '';

if (!isMainBranch()) {
  const paths = getChangedPackages();

  if (paths.length > 0) {
    paths.push(path.join(__dirname, '../playwright'));
  }

  changedPaths = paths.map(item => `${item}/__tests__/**/*.test.ts`).join(' ');
}

exec(`playwright test --project=${BROWSER || 'chrome'} ${changedPaths}`, exit);
