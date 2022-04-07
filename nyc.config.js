module.exports = {
  include: ['packages/*/src/**/*.+(ts|tsx)'],
  excludeAfterRemap: true,
  reporter: ['lcov', 'cobertura'],
  'report-dir': 'cypress/coverage',
};
