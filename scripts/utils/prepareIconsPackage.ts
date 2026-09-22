import { existsSync } from 'fs';
import path from 'path';

import { logInfo } from './console';
import { execAsync } from './execAsync';

/**
 * Компоненты иконок генерируются из svg и в гит не коммитятся — без сборки пакет непригоден.
 * Вместе с ним собирается utils: на него ссылаются сгенерированные компоненты.
 */
export const prepareIconsPackage = async () => {
  if (existsSync(path.resolve(__dirname, '../../packages/icons/dist'))) return;

  logInfo('Building icons package...');
  await execAsync('pnpm -F @cloud-ru/uikit-product-icons run compile');
  await execAsync(
    'pnpm exec tspc -b packages/utils/tsconfig.esm.json packages/utils/tsconfig.cjs.json' +
      ' packages/icons/tsconfig.esm.json packages/icons/tsconfig.cjs.json',
  );
};
