const path = require('path');
const fs = require('fs');

const ensureDirectory = filePath => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectory(dirname);
    fs.mkdirSync(dirname);
  }
};

module.exports = ensureDirectory;
