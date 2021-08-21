const depCheck = require('depcheck');
const path = require('path');
const glob = require('glob');
const { logError, logInfo, logDebug } = require('./utils/console');

const options = {
  ignoreBinPackage: false,
  skipMissing: false,
  ignorePatterns: ['stories', 'dist'],
  ignoreMatches: ['@ag-grid-enterprise/core'],
};

const packages = `../packages/*`;

const folders = glob.sync(`${path.resolve(__dirname, packages)}`);

const UnusedDeps = [];
const UnusedDevDeps = [];
const Missing = [];

(async () => {
  for (const folder of folders) {
    const { dependencies, devDependencies, missing } = await depCheck(folder, options);

    UnusedDeps.push(...dependencies.map(x => `${folder}: ${x}`));
    UnusedDevDeps.push(...devDependencies.map(x => `${folder}: ${x}`));
    Missing.push(missing);
  }
})().then(() => {
  const FilteredMissing = Missing.filter(x => Object.keys(x).length);
  if (UnusedDeps.length || UnusedDevDeps.length || FilteredMissing.length) {
    if (UnusedDeps.length) {
      logError('You have to fix following unused dependencies:');
      UnusedDeps.forEach(x => logDebug(x));
    }
    if (UnusedDevDeps.length) {
      logError('You have to fix following unused dev dependencies:');
      UnusedDevDeps.forEach(x => logDebug(x));
    }
    if (FilteredMissing.length) {
      logError('You have to fix following missed dependencies:');
      FilteredMissing.forEach(x => logDebug(JSON.stringify(x, null, 2)));
    }

    process.exit(1);
  } else {
    logInfo('Dependencies has been checked. Everything is ok.');
  }
});
