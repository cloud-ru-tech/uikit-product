import shell from 'shelljs';

import { logError, logInfo } from './utils/console';
import { getChangedPackages } from './utils/getChangedPackages';
import { isMainBranch } from './utils/isMainBranch';
import { prepareIconsPackage } from './utils/prepareIconsPackage';

const buildStorybookForChangedPackages = async () => {
  logInfo('Building Storybook...');

  const changedPackages = getChangedPackages();
  const isOnMainBranch = isMainBranch();

  // Извлекаем имена пакетов из путей (например, packages/button-predefined -> button-predefined)
  const packageNames = changedPackages.map(packagePath => packagePath.split('/').pop()).filter(Boolean);

  await prepareIconsPackage();

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

  logInfo('Storybook build completed successfully!');
};

buildStorybookForChangedPackages();
