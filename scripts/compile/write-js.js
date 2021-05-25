const path = require('path');
const fs = require('fs');

const ensureDirectory = require('../utils/ensureDirectory');

module.exports =
  ({ src, distCJS, distESM }) =>
  transformJs =>
  file => {
    const relativePathToSrcFile = path.relative(src, file);
    const dirname = path.dirname(relativePathToSrcFile);
    const extension = path.extname(relativePathToSrcFile);
    const basename = path.basename(relativePathToSrcFile, extension);
    const filename = path.join(dirname, `${basename}.js`);

    const cjsOutFile = path.resolve(distCJS, filename);
    const esmOutFile = path.resolve(distESM, filename);

    const content = transformJs(file);

    ensureDirectory(cjsOutFile);
    ensureDirectory(esmOutFile);

    fs.writeFileSync(cjsOutFile, content.cjs);
    fs.writeFileSync(esmOutFile, content.esm);
  };
