import * as fs from 'fs/promises';
import path from 'path';

import { normalizeName } from './utils';

const SOURCE_PATH = 'scripts/import/interface-icons-product/S';
const DESTINATION_PATH = 'svgs/inherit/interface-icons-product';

(async () => {
  const iconsFilesNames = await fs.readdir(SOURCE_PATH);

  for (const fileName of iconsFilesNames) {
    const [name, extension] = fileName.split('.');
    const camelcaseFileName = normalizeName(name);

    await fs.copyFile(
      path.join(SOURCE_PATH, fileName),
      path.join(DESTINATION_PATH, `${camelcaseFileName}.${extension}`),
    );
  }

  console.info('[DONE] Interface Product icons successfully imported');
})();
