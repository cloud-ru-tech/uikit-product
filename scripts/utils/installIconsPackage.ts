import path from 'path';

import shell from 'shelljs';

import { getPackageJson } from './getPackageJson';

export const installIconsPackage = () => {
  const iconsPackageVersion = getPackageJson(path.resolve(__dirname, '../../packages/icons'))?.version ?? 'latest';

  shell.exec('rm -rf ./packages/icons');
  shell.exec(`pnpm add @cloud-ru/uikit-product-icons@${iconsPackageVersion} -w -D`);
  shell.exec('pnpm install --frozen-lockfile=false');

  return () => {
    shell.exec('git checkout ./packages/icons');
    shell.exec('git checkout pnpm-lock.yaml');
    shell.exec('git checkout package.json');
  };
};
