import fs from 'fs';
import path from 'path';

import { globSync } from 'glob';

import { logDebug, logError, logInfo } from './utils/console';

const OLD_PREFIX = '@sbercloud/uikit-product-';
const NEW_PREFIX = '@cloud-ru/uikit-product-';

const FILE_PATTERNS = ['**/*.ts', '**/*.tsx', '**/package.json', '**/*.md'];

const IGNORE_PATTERNS = ['**/node_modules/**', '**/dist/**', '**/.git/**'];

/**
 * Заменяет префикс пакета в содержимом файла
 */
function replacePrefixInContent(content: string, filePath: string): { newContent: string; changesCount: number } {
  const regex = new RegExp(OLD_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = content.match(regex);
  const changesCount = matches ? matches.length : 0;

  if (changesCount > 0) {
    logDebug(`Found ${changesCount} occurrence(s) in ${filePath}`);
    return {
      newContent: content.replace(regex, NEW_PREFIX),
      changesCount,
    };
  }

  return { newContent: content, changesCount: 0 };
}

/**
 * Обрабатывает один файл: читает, заменяет префикс, записывает обратно
 * @returns Объект с информацией о результате обработки
 */
function processFile(filePath: string): { changed: boolean; error: boolean } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { newContent, changesCount } = replacePrefixInContent(content, filePath);

    if (changesCount > 0) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      logInfo(`Updated: ${filePath} (${changesCount} change(s))`);
      return { changed: true, error: false };
    }

    return { changed: false, error: false };
  } catch (error) {
    logError(`Error processing ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    return { changed: false, error: true };
  }
}

(async function () {
  logInfo('Starting package prefix replacement...');
  logInfo(`Replacing "${OLD_PREFIX}" with "${NEW_PREFIX}"`);

  const projectRoot = path.resolve(__dirname, '..');
  const scriptFilePath = __filename;
  const allFiles: string[] = [];

  for (const pattern of FILE_PATTERNS) {
    const files = globSync(pattern, {
      cwd: projectRoot,
      ignore: IGNORE_PATTERNS,
      absolute: true,
    });
    allFiles.push(...files);
  }

  const uniqueFiles = Array.from(new Set(allFiles)).filter(file => file !== scriptFilePath);

  logInfo(`Found ${uniqueFiles.length} file(s) to process (excluding script itself)`);

  let processedCount = 0;
  let changedCount = 0;
  let errorCount = 0;

  for (const filePath of uniqueFiles) {
    processedCount++;
    const result = processFile(filePath);
    if (result.changed) {
      changedCount++;
    }
    if (result.error) {
      errorCount++;
    }
  }

  logInfo(`\nProcessing complete:`);
  logInfo(`  Total files processed: ${processedCount}`);
  logInfo(`  Files changed: ${changedCount}`);
  if (errorCount > 0) {
    logError(`  Errors: ${errorCount}`);
  }

  if (errorCount > 0) {
    process.exit(1);
  }
})();
