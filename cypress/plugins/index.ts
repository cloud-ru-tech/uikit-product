/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CypressCodeCoverage from '@cypress/code-coverage/task';

import DeleteSuccessVideos from './deleteSuccessVideos';

import PluginEvents = Cypress.PluginEvents;
import PluginConfigOptions = Cypress.PluginConfigOptions;

// eslint-disable-next-line import/no-default-export
export default (on: PluginEvents, config: PluginConfigOptions) => {
  CypressCodeCoverage(on, config);
  DeleteSuccessVideos(on);

  const browser = config.env.BROWSER;

  if (browser) {
    config.videosFolder = `${config.videosFolder}/${browser}`;
    config.screenshotsFolder = `${config.screenshotsFolder}/${browser}`;

    if (browser === 'firefox') {
      config.video = false;
    }
  }

  return config;
};
