import { readdirSync } from 'fs';
import { resolve } from 'path';

import { generateDataTestId } from './generateDataTestId';

const iconsFolder = resolve(process.cwd(), './packages/icons');

export function getIconsDataTestIds(pathToIcons: string, filterMap?: (name: string) => string) {
  const icons = readdirSync(resolve(iconsFolder, pathToIcons));

  const finalList = filterMap ? icons.map(filterMap).filter(Boolean) : icons.filter(icon => icon.endsWith('.svg'));

  return finalList.map(generateDataTestId);
}
