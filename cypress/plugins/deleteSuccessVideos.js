const { readdir, stat, access } = require('fs/promises');
const { join } = require('path');
const { promisify } = require('util');

const rimraf = require('rimraf');

module.exports = on => {
  const del = promisify(rimraf);

  on('after:spec', (spec, results) => {
    if (results.stats.failures === 0 && results.video) {
      return del(results.video);
    }
  });

  on('after:run', async results => {
    const { videosFolder } = results.config;

    async function cleanup(path) {
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
  });
};
