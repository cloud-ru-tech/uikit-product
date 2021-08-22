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

const InternalPackages = {};
const folders = glob.sync(`${path.resolve(__dirname, packages)}`);

for (const folder of folders) {
  const pkg = require(path.resolve(folder, 'package.json'));
  InternalPackages[pkg.name] = pkg.version;
}

const WrongVersions = [];
const InternalAsDev = [];
const UnusedDeps = [];
const Missing = [];

for (const folder of folders) {
  const pkg = require(path.resolve(folder, 'package.json'));
  const usedInternal = Object.keys(pkg.dependencies || {}).filter(x => /@sbercloud\/uikit/.test(x));
  usedInternal.forEach(dep => {
    if (pkg.dependencies[dep] !== InternalPackages[dep]) {
      WrongVersions.push(
        `Error in ${pkg.name}: ${dep} has ${pkg.dependencies[dep]}, but correct version is ${InternalPackages[dep]}`,
      );
    }
  });

  const usedInternalDev = Object.keys(pkg.devDependencies || {}).filter(x => /@sbercloud\/uikit/.test(x));
  usedInternalDev.forEach(dep => InternalAsDev.push(`Error in ${pkg.name}: ${dep}`));
}

(async () => {
  for (const folder of folders) {
    const { dependencies, missing } = await depCheck(folder, options);

    UnusedDeps.push(...dependencies.map(x => `${folder}: ${x}`));
    Missing.push(missing);
  }
})().then(() => {
  const FilteredMissing = Missing.filter(x => Object.keys(x).length);
  if (UnusedDeps.length || FilteredMissing.length || WrongVersions.length || InternalAsDev.length) {
    if (WrongVersions.length) {
      logError('You have to fix wrong version of internal packages:');
      WrongVersions.forEach(x => logDebug(x));
    }

    if (InternalAsDev.length) {
      logError(
        'You have to fix wrong usage of internal packages in dev dependencies (either delete them or move to dependencies):',
      );
      InternalAsDev.forEach(x => logDebug(x));
    }

    if (UnusedDeps.length) {
      logError('You have to fix following unused dependencies:');
      UnusedDeps.forEach(x => logDebug(x));
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
