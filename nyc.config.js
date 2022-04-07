const defaultExclude = require('@istanbuljs/schema/default-exclude');
const glob = require('glob');

const STORIES = glob.sync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/*.{ts,tsx}`);

module.exports = {
  exclude: STORIES.concat(defaultExclude),
  excludeAfterRemap: true,
  reporter: ['lcov', 'cobertura'],
  ['report-dir']: 'cypress/coverage',
};
