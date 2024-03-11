import * as fs from 'fs/promises';
import path from 'path';

import camelcase from 'lodash.camelcase';

import { kebabCase } from './utils';

const SOURCE_PATH = 'scripts/import';
const DESTINATION_PATH = 'svgs/inherit';

const IGNORED_FILES = ['.gitignore', '.DS_Store'];

(async () => {
  const collections = await fs.readdir(SOURCE_PATH);
  const folders = collections.filter(collection => !IGNORED_FILES.includes(collection));

  for (const folder of folders) {
    try {
      await fs.mkdir(path.join(DESTINATION_PATH, folder));
      // eslint-disable-next-line
    } catch {}

    const sizes = await fs.readdir(path.join(SOURCE_PATH, folder));
    for (const size of sizes) {
      const sizeFolderPath = path.join(SOURCE_PATH, folder, size);

      const fileStats = await fs.stat(sizeFolderPath);
      if (!fileStats.isDirectory()) {
        continue;
      }

      const iconsFilesNames = await fs.readdir(sizeFolderPath);

      for (const fileName of iconsFilesNames) {
        const [name, extension] = fileName.split('.');
        const camelcaseFileName = camelcase(name);
        const kebabFileName = `${kebabCase(camelcaseFileName)}-${size}`.toLowerCase();

        try {
          await fs.mkdir(path.join(DESTINATION_PATH, folder, camelcaseFileName));
          // eslint-disable-next-line
        } catch {}

        await fs.copyFile(
          path.join(SOURCE_PATH, folder, size, fileName),
          path.join(DESTINATION_PATH, folder, camelcaseFileName, `${kebabFileName}.${extension}`),
        );
      }
    }
  }

  console.info('[DONE]');
})();
