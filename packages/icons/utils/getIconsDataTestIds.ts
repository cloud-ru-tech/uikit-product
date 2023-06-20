import { readdirSync } from 'fs';
import { resolve } from 'path';

import { generateDataTestId } from './generateDataTestId';

const iconsFolder = resolve(process.cwd(), './packages/icons');

export function getIconsDataTestIds(pathToIcons: string) {
  const icons = readdirSync(resolve(iconsFolder, pathToIcons));

  return icons.map(generateDataTestId);
}
