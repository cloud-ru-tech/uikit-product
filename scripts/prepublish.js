const pkg = require('../package.json');
const fse = require('fs-extra');
const path = require('path');

const prepublish = async () => {
  const dirs = fse
    .readdirSync(path.resolve(__dirname, '../src'), {
      withFileTypes: true,
    })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const dir of dirs) {
    const dest = path.resolve(__dirname, '..', dir, 'package.json');
    const content = {
      name: `${pkg.name}/${dir}`,
      private: true,
      main: `../dist/esm/${dir}`,
      types: `../dist/types/${dir}`,
    };

    await fse.ensureFile(dest);
    await fse.writeJson(dest, content, {
      spaces: 2,
    });
  }

  const package = {
    ...pkg,
    files: [...pkg.files, ...dirs],
  };

  await fse.writeJson(path.resolve(__dirname, '../package.json'), package, {
    spaces: 2,
  });
};

prepublish();
