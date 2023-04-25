import path from 'path';

import glob from 'glob';

import { getChangedPackages } from '../utils/getChangedPackages';
import { shouldRunAllTests } from '../utils/shouldRunAllTests';

const packagesDir = path.join(__dirname, '../../packages');

// need this file if a group of changed tests is empty
const DEFAULT_ENTRY = 'storybook/preview.tsx';

function isStableVersion(version: string) {
  return Number(version[0]) > 0;
}

function toPattern(basename: string) {
  return `packages/${basename}/src/**/*`;
}

function getPackageEntries() {
  const runAllTests = shouldRunAllTests();

  const allPackages = glob.sync(path.join(packagesDir, '*'));

  const paths = runAllTests ? allPackages : getChangedPackages();

  return paths.map(dirname => ({
    pattern: toPattern(path.basename(dirname)),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    version: require(path.join(dirname, 'package.json')).version,
  }));
}

export function getAllPatterns() {
  return getPackageEntries().map(entry => entry.pattern);
}

export function getStablePatterns() {
  const entries = getPackageEntries()
    .filter(entry => isStableVersion(entry.version))
    .filter(el => !el.pattern.match('icons'))
    .map(entry => entry.pattern);

  if (entries.length === 0) {
    entries.push(DEFAULT_ENTRY);
  }

  return entries;
}

export function getUnstablePatterns() {
  const entries = getPackageEntries()
    .filter(entry => !isStableVersion(entry.version))
    .map(entry => entry.pattern);

  if (entries.length === 0) {
    entries.push(DEFAULT_ENTRY);
  }

  return entries;
}
