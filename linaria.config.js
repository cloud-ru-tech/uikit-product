const PACKAGE = require('./package.json');

module.exports = {
  evaluate: true,
  displayName: true,
  classNameSlug: (hash, title) => `${title}-${PACKAGE.version}-${hash}`,
};
