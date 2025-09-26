import { readFileSync } from 'fs';
import path from 'path';

import { PackageJson } from 'storybook/internal/types';

export const getPackageJson = (packagePath: string): PackageJson | undefined => {
  try {
    return JSON.parse(readFileSync(path.resolve(`${packagePath}/package.json`), 'utf8'));
  } catch {
    return undefined;
  }
};
