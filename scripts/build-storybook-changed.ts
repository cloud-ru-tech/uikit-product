import { existsSync } from 'fs';
import path from 'path';

import shell from 'shelljs';

import { logError, logInfo } from './utils/console';
import { getChangedPackages } from './utils/getChangedPackages';
import { installIconsPackage } from './utils/installIconsPackage';
import { isMainBranch } from './utils/isMainBranch';

const prepareIconsPackage = (needToCompileIcons: boolean) => {
  const iconsAlreadyCompiled = existsSync(path.resolve(__dirname, '../packages/icons/dist'));

  if (!iconsAlreadyCompiled && needToCompileIcons) {
    logInfo('Icons package is changed. Compiling...');
    shell.exec('pnpm -F @sbercloud/uikit-product-icons run compile');

    return undefined;
  }

  if (!iconsAlreadyCompiled) {
    return installIconsPackage();
  }

  return undefined;
};

const buildStorybookForChangedPackages = () => {
  logInfo('Building Storybook...');

  const changedPackages = getChangedPackages();
  const isOnMainBranch = isMainBranch();

  // Извлекаем имена пакетов из путей (например, packages/button-predefined -> button-predefined)
  const packageNames = changedPackages.map(packagePath => packagePath.split('/').pop()).filter(Boolean);

  const needToCompileIcons = packageNames.includes('icons') || !packageNames.length || isOnMainBranch;
  const revertIconsPackage = prepareIconsPackage(needToCompileIcons);

  let storybookBuildEnvPrefix = '';

  if (packageNames.length && !isOnMainBranch) {
    // Формируем паттерн для фильтрации в storybook
    const packagePattern = `?(${packageNames.join('|')})`;

    storybookBuildEnvPrefix = `STORYBOOK_PACKAGE_NAME="${packagePattern}"`;

    logInfo(`Found ${packageNames.length} changed packages. Building Storybook with pattern: ${packagePattern}`);
  } else {
    logInfo(`Building Storybook for all packages...`);
  }

  // Запускаем сборку storybook с фильтрацией по измененным пакетам
  const result = shell.exec(`${storybookBuildEnvPrefix} pnpm build:storybook:all`);

  if (result.code !== 0) {
    logError('Storybook build failed');
    process.exit(1);
  }

  revertIconsPackage?.();

  logInfo('Storybook build completed successfully!');
};

buildStorybookForChangedPackages();
