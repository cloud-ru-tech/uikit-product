import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'uikit',
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/reports/report-[hash].xml',
    toConsole: false,
  },
  videoUploadOnPasses: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    specPattern: './/packages/*/__tests__/**/*.*',
  },
});
