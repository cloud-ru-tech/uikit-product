import { readFileSync, writeFileSync } from 'fs';

import shell from 'shelljs';

import { logDebug, logError, logInfo } from './utils/console';
import { execAsync } from './utils/execAsync';
import { getAllPackageFolders } from './utils/getAllPackageFolders';
import { getChangedPackages } from './utils/getChangedPackages';

async function buildAllPackages() {
  const start = performance.now();
  logDebug(`Building packages...`);

  shell.exec('pnpm compile:packages');

  const results = await Promise.allSettled([
    execAsync('pnpm build:packages:esm'),
    execAsync('pnpm build:packages:cjs'),
    execAsync('pnpm build:css'),
  ]);

  const rejectedResults = results.filter(result => result.status === 'rejected');

  if (rejectedResults.length > 0) {
    console.info('Failed to build packages');
    console.info(rejectedResults.map(result => result.reason?.stdout).join('\n'));
    shell.exit(1);
  }

  const end = performance.now();
  logInfo(`Total build time: ${(end - start) / 1000} seconds.`);
}

/**
 * Временно удаляет неизмененные пакеты, чтобы они устанавливались из registry
 */
function temporarilyRemoveUnchangedPackages(changedPackages: string[]) {
  const allPackages = getAllPackageFolders();

  const unchangedPackages = allPackages.filter(pkgName => !changedPackages.includes(pkgName));

  if (unchangedPackages.length > 0) {
    logInfo(`Temporarily removing ${unchangedPackages.length} unchanged packages...`);

    shell.exec(unchangedPackages.map(pkg => `rm -rf ${pkg}`).join(' && '));

    // Устанавливаем зависимости из registry
    logInfo('Installing dependencies from registry...');
    shell.exec('pnpm install --frozen-lockfile=false');

    // Возвращаем функцию для восстановления
    return () => {
      logInfo('Restoring temporarily removed packages...');
      shell.exec(`git checkout ${unchangedPackages.map(pkg => pkg).join(' ')}`);
      shell.exec('git checkout package.json');
      shell.exec('git checkout pnpm-lock.yaml');
    };
  }

  return () => {}; // Пустая функция если нечего восстанавливать
}

/**
 * Собирает пакеты с помощью lerna, передавая только нужные пакеты
 */
function buildPackagesWithLerna(packagesToBuild: string[]): boolean {
  if (packagesToBuild.length === 0) {
    logInfo('No packages to build.');
    return true;
  }

  // Формируем scope для lerna
  const scopes = packagesToBuild.map(packageName => `--scope=@cloud-ru/uikit-product-${packageName}`).join(' ');

  logInfo(`Building ${packagesToBuild.length} packages: ${packagesToBuild.join(', ')}`);

  // Компилируем только нужные пакеты
  const compileResult = shell.exec(`lerna run compile ${scopes}`);
  if (compileResult.code !== 0) {
    logError(`Package compilation failed:\n${compileResult.stderr}`);
    return false;
  }

  return true;
}

/**
 * Создает отфильтрованную конфигурацию TypeScript
 */
function createFilteredTsConfig(tsConfigPath: string, packageNames: string[]): Record<string, unknown> {
  const tsConfig = JSON.parse(readFileSync(tsConfigPath, 'utf8'));

  if (!tsConfig.references) {
    tsConfig.references = [];
  }

  // Фильтруем references по именам пакетов
  tsConfig.references = tsConfig.references.filter((ref: { path: string }) => {
    // Извлекаем имя папки из пути (например, "./calculator/tsconfig.esm.json" -> "calculator")
    const packageName = ref.path.split('/')[1];
    return packageNames.includes(packageName || '');
  });

  return tsConfig;
}

/**
 * Собирает конкретный формат (ESM или CJS) с фильтрацией по пакетам
 */
async function buildFormatWithFilter(
  format: 'esm' | 'cjs',
  packageNames: string[],
): Promise<{ code: number; stdout: string; stderr: string }> {
  // Используем TypeScript компилятор с фильтрацией
  const configFilePath = `./packages/tsconfig.${format}.json`;

  // Создаем временную конфигурацию с фильтрацией
  const tempConfig = createFilteredTsConfig(configFilePath, packageNames);

  // Записываем временную конфигурацию
  writeFileSync(configFilePath, JSON.stringify(tempConfig, null, 2));

  const result = await execAsync(`tspc -b ${configFilePath}`);

  // Откатываем временный файл
  shell.exec(`git checkout ${configFilePath}`);

  if (result.code === 0) {
    return result;
  }

  throw new Error(`Failed to build ${format} format:\n${result.stderr || result.stdout}`);
}

/**
 * Собирает ESM и CJS версии для указанных пакетов
 */
async function buildPackageFormats(packageNames: string[]): Promise<boolean> {
  if (packageNames.length === 0) {
    return true;
  }

  logInfo(`Building ESM and CJS formats for: ${packageNames.join(', ')}`);

  // Для частичной сборки используем TypeScript компилятор с фильтрацией
  // Создаем временные конфигурации с фильтрацией по пакетам
  const results = await Promise.allSettled([
    buildFormatWithFilter('esm', packageNames),
    buildFormatWithFilter('cjs', packageNames),
    execAsync('pnpm build:css'),
  ]);

  const rejectedResults = results.filter(result => result.status === 'rejected');
  if (rejectedResults.length > 0) {
    logError(
      `Failed to build package formats:\n ${rejectedResults.map(result => result.reason.stderr || result.reason.stdout).join('\n')}`,
    );
    return false;
  }

  return true;
}

async function buildChangedPackages() {
  const start = performance.now();
  logDebug('Building changed packages and their dependencies...');

  // Получаем измененные пакеты
  const changedPackages = getChangedPackages();

  if (changedPackages.length === 0) {
    logInfo('No changed packages found. Nothing to build.');
    return;
  }

  const packageNames = changedPackages
    .map(packagePath => packagePath.split('/').pop())
    .filter((packageName): packageName is string => Boolean(packageName));

  logInfo(`Found ${changedPackages.length} changed packages: ${packageNames.join(', ')}`);

  // Временно удаляем неизмененные пакеты
  const restorePackages = temporarilyRemoveUnchangedPackages(changedPackages);

  try {
    // Собираем только измененные пакеты
    const compileSuccess = buildPackagesWithLerna(packageNames);
    if (!compileSuccess) {
      throw new Error('Package compilation failed');
    }

    // Собираем форматы (ESM, CJS, CSS)
    const formatSuccess = await buildPackageFormats(packageNames);
    if (!formatSuccess) {
      throw new Error('Package format building failed');
    }

    const end = performance.now();
    logInfo(`Total build time: ${(end - start) / 1000} seconds.`);
    logInfo(`Successfully built ${packageNames.length} packages.`);
  } catch (error) {
    logError('Build failed:');
    console.error(error);
    process.exit(1);
  } finally {
    // Восстанавливаем временно удаленные пакеты
    restorePackages();
  }
}

// На пайпе собираем только измененные пакеты
if (process.env.CI) {
  buildChangedPackages();
} else {
  buildAllPackages();
}
