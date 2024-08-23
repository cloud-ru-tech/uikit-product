import * as fs from 'fs/promises';
import path from 'path';

import camelcase from 'lodash.camelcase';

import { kebabCase } from './utils';

const SOURCE_PATH = 'scripts/import/interface-icons-system';
const DESTINATION_PATH = 'svgs/inherit/interface-icons-system';

(async () => {
  const sizes = await fs.readdir(path.join(SOURCE_PATH));
  for (const size of sizes) {
    const sizeFolderPath = path.join(SOURCE_PATH, size);

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
        await fs.mkdir(path.join(DESTINATION_PATH, camelcaseFileName));
        // eslint-disable-next-line
      } catch {}

      await fs.copyFile(
        path.join(SOURCE_PATH, size, fileName),
        path.join(DESTINATION_PATH, camelcaseFileName, `${kebabFileName}.${extension}`),
      );
    }
  }

  console.info('[DONE] Interface System icons successfully imported');
})();
