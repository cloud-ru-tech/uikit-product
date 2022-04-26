const rimraf = require('rimraf');

module.exports = on => {
  on('after:spec', (spec, results) => {
    if (results.stats.failures === 0 && results.video) {
      const pathToDelete = results.video.replace(/\/__tests__\/.*/g, '');
      results.video = null;

      rimraf(pathToDelete, () => {});
    }
  });
};
