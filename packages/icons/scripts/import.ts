import * as fs from 'fs/promises';
import path from 'path';

import { capitalize, kebabCase, normalizeName, replaceColorsWithValue } from './utils';

const SOURCE_PATH = 'scripts/import';
const DESTINATION_PATH = 'svgs/';

const IGNORED_FILES = ['.gitignore', '.DS_Store'];

(async () => {
  const collections = await fs.readdir(SOURCE_PATH);
  const folders = collections.filter(collection => !IGNORED_FILES.includes(collection));

  for (const folder of folders) {
    const destinationFolder = kebabCase(folder);

    try {
      await fs.mkdir(path.join(DESTINATION_PATH, destinationFolder));
      // eslint-disable-next-line
    } catch {}

    const iconsFilesNames = await fs.readdir(path.join(SOURCE_PATH, folder));

    for (const fileName of iconsFilesNames) {
      const [name, extension] = fileName.split('.');

      if (extension.toLowerCase() !== 'svg') {
        console.log(`File "${fileName}" does not look like svg file. It was ignored.`);
        continue;
      }

      const camelcaseFileName = capitalize(normalizeName(name));

      await fs.copyFile(
        path.join(SOURCE_PATH, folder, fileName),
        path.join(DESTINATION_PATH, destinationFolder, `${camelcaseFileName}.${extension}`),
      );
    }
  }

  console.info('[DONE]');
})();
