import { defineConfig } from 'cypress';

import Plugins from './cypress/plugins';

import PluginEvents = Cypress.PluginEvents;
import PluginConfigOptions = Cypress.PluginConfigOptions;

export const settings: Cypress.ConfigOptions = {
  projectId: 'uikit',
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/reports/report-[hash].xml',
    toConsole: false,
  },
  retries: 2,
  videoUploadOnPasses: false,
  e2e: {
    setupNodeEvents(on: PluginEvents, config: PluginConfigOptions) {
      return Plugins(on, config);
    },
    specPattern: './packages/*/__tests__/**/*.*',
  },
};

export default defineConfig(settings);
