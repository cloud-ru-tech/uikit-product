const { execFileSync } = require('child_process');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const useConventionalCommits = args['c'];
const firstStableVersion = args['v1'];

const getLernaParameters = () => {
  const parameters = firstStableVersion
    ? ['version', 'major', '--include-merged-tags', '--exact', '--no-commit-hooks']
    : ['version', '--include-merged-tags', '--exact', '--no-commit-hooks'];

  if (useConventionalCommits) {
    parameters.push('--conventional-commits');
    parameters.push('--conventional-graduate');
  }

  return parameters;
};

const lernaParameters = getLernaParameters();

const lernaCommand = process.platform === 'win32' ? 'lerna.cmd' : 'lerna';
execFileSync(lernaCommand, lernaParameters, { stdio: 'inherit' });
