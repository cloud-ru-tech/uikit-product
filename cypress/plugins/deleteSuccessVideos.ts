/// <reference types="cypress" />
import { access, readdir, stat } from 'fs/promises';
import { join } from 'path';
import { promisify } from 'util';

import rimraf from 'rimraf';

import PluginEvents = Cypress.PluginEvents;

// eslint-disable-next-line import/no-default-export
export default (on: PluginEvents) => {
  const del = promisify(rimraf);

  on('after:spec', (spec, results) => {
    if (results.stats.failures === 0 && results.video) {
      return del(results.video);
    }
  });

  on('after:run', async results => {
    if ('config' in results) {
      const { videosFolder } = results.config;

      async function cleanup(path: string) {
        if (!(await stat(path)).isDirectory()) {
          return;
        }

        await Promise.all((await readdir(path)).map(name => cleanup(join(path, name))));

        if ((await readdir(path)).length === 0) {
          await del(path);
        }
      }

      try {
        await access(videosFolder);
      } catch {
        return;
      }

      await cleanup(videosFolder);
    }
  });
};
