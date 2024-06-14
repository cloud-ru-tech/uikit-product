import * as fs from 'fs/promises';
import path from 'path';

import { XMLParser } from 'fast-xml-parser';

import { validateIconSize, validateIconUniqueness, Validator } from './iconValidators';

const OPTIONS = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
};

const xmlParser = new XMLParser(OPTIONS);
const validators: Validator[] = [validateIconSize, validateIconUniqueness];

const COLLECTIONS = [path.join(__dirname, '../svgs/inherit/interface-icons-system')];

const IGNORED_FILES = ['.gitignore'];

const validateCollection = async (sourcePath: string) => {
  const collections = await fs.readdir(sourcePath);
  const folders = collections.filter(collection => !IGNORED_FILES.includes(collection));
  const foldersWithIcons = await Promise.all(folders.map(folder => fs.readdir(path.join(sourcePath, folder))));
  const iconPaths = folders.flatMap((folder, index) => foldersWithIcons[index].map(icon => `${folder}/${icon}`));

  const icons = await Promise.all(
    iconPaths.map(async iconPath => {
      const content = await fs.readFile(path.join(sourcePath, iconPath), 'utf-8');
      return { path: iconPath, content, xml: xmlParser.parse(content) };
    }),
  );

  validators.forEach(validator => {
    icons.forEach(icon => {
      if (!validator.validate({ icon, allIcons: icons })) {
        throw new Error(`${icon.path}: ${validator.error}`);
      }
    });
  });
};

(async () => {
  for (const collection of COLLECTIONS) {
    await validateCollection(collection);
  }

  console.info('All icons are valid.');
})();
