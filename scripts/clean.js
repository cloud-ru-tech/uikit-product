const pkg = require('../package.json');
const fse = require('fs-extra');
const path = require('path');

const clean = async () => {
  const dirs = fse
    .readdirSync(path.resolve(__dirname, '../src'), {
      withFileTypes: true,
    })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const dir of dirs) {
    const dest = path.resolve(__dirname, '..', dir);

    await fse.removeSync(dest);
  }

  const package = {
    ...pkg,
    files: pkg.files.filter(file => !dirs.includes(file)),
  };

  await fse.writeJson(path.resolve(__dirname, '../package.json'), package, {
    spaces: 2,
  });
};

clean();
