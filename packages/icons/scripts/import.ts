import * as fs from 'fs/promises';
import path from 'path';

import camelcase from 'lodash.camelcase';

import { capitalize, kebabCase, normalizeName, replaceColorsWithValue } from './utils';

const SOURCE_PATH = 'scripts/import';
const DESTINATION_PATH = 'svgs/illustrations';
const DESTINATION_PLATFORMS_PATH = 'svgs/inherit/interface-icons-product';

const IGNORED_FILES = ['.gitignore', '.DS_Store'];

(async () => {
  const collections = await fs.readdir(SOURCE_PATH);
  const folders = collections.filter(collection => !IGNORED_FILES.includes(collection));

  for (const folder of folders) {
    const destinationFolder = camelcase(folder).toLowerCase();

    try {
      await fs.mkdir(path.join(DESTINATION_PATH, destinationFolder));
      // eslint-disable-next-line
    } catch {}

    const iconsFilesNames = await fs.readdir(path.join(SOURCE_PATH, folder));

    for (const fileName of iconsFilesNames) {
      const [name, extension] = fileName.split('.');
      const camelcaseFileName = capitalize(normalizeName(name));

      await fs.copyFile(
        path.join(SOURCE_PATH, folder, fileName),
        path.join(DESTINATION_PATH, destinationFolder, `${camelcaseFileName}.${extension}`),
      );

      const camelCaseProductFileName = `${destinationFolder}Service${camelcaseFileName}`;
      try {
        await fs.mkdir(path.join(DESTINATION_PLATFORMS_PATH, camelCaseProductFileName));
        // eslint-disable-next-line
      } catch {}

      const kebabFileName = kebabCase(`${camelCaseProductFileName}-s`);
      const iconBuffer = await fs.readFile(path.join(SOURCE_PATH, folder, fileName));
      const iconString = iconBuffer.toString();
      const blackIcon = replaceColorsWithValue(iconString);
      const blackIconBuffer = Buffer.from(blackIcon, 'utf8');

      await fs.writeFile(
        path.join(DESTINATION_PLATFORMS_PATH, camelCaseProductFileName, `${kebabFileName}.${extension}`),
        blackIconBuffer,
      );
    }
  }

  console.info('[DONE]');
})();
