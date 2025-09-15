import path from 'path';

import { exec, exit } from 'shelljs';

import { getChangedPackages } from './utils/getChangedPackages';
import { isMainBranch } from './utils/isMainBranch';

const { BROWSER } = process.env;

let changedPaths = '';

if (!isMainBranch()) {
  const paths = getChangedPackages();

  if (paths.length > 0) {
    paths.push(path.join(__dirname, '../testcafe'));
  }

  changedPaths = paths.map(item => `${item}/__tests__/*.ts`).join(' ');
}

exec(
  `testcafe ${BROWSER ? `"${BROWSER}:headless --no-sandbox"` : 'chrome'} --config-file testcafe.config.js ${changedPaths}`,
  exit,
);
