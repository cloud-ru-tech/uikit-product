import fs from 'fs';
import path from 'path';

import { globSync } from 'glob';

import { logDebug, logError, logInfo } from './utils/console';

const OLD_URL = 'https://git.sbercloud.tech/sbercloud-ui/uikit-product';
const NEW_URL = 'https://gitverse.ru/cloud-ru-tech/uikit-product';

const FILE_PATTERNS = ['**/package.json', '**/*.md'];

const IGNORE_PATTERNS = ['**/node_modules/**', '**/dist/**', '**/.git/**'];

/**
 * Заменяет старый URL на новый в содержимом строки
 */
function replaceUrlInString(content: string): { newContent: string; changesCount: number } {
  const regex = new RegExp(OLD_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = content.match(regex);
  const changesCount = matches ? matches.length : 0;

  if (changesCount > 0) {
    return {
      newContent: content.replace(regex, NEW_URL),
      changesCount,
    };
  }

  return { newContent: content, changesCount: 0 };
}

/**
 * Обрабатывает один файл: читает, заменяет URL, записывает обратно
 * @returns Объект с информацией о результате обработки
 */
function processFile(filePath: string): { changed: boolean; error: boolean; changesCount: number } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { newContent, changesCount } = replaceUrlInString(content);

    if (changesCount > 0) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      logInfo(`Updated: ${filePath} (${changesCount} change(s))`);
      logDebug(`Changed "${OLD_URL}" to "${NEW_URL}"`);
      return { changed: true, error: false, changesCount };
    }

    return { changed: false, error: false, changesCount: 0 };
  } catch (error) {
    logError(`Error processing ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    return { changed: false, error: true, changesCount: 0 };
  }
}

(async function () {
  logInfo('Starting repository URL replacement...');
  logInfo(`Replacing "${OLD_URL}" with "${NEW_URL}"`);

  const projectRoot = path.resolve(__dirname, '..');
  const allFiles: string[] = [];

  // Ищем все файлы по паттернам
  for (const pattern of FILE_PATTERNS) {
    const files = globSync(pattern, {
      cwd: projectRoot,
      ignore: IGNORE_PATTERNS,
      absolute: true,
    });
    allFiles.push(...files);
  }

  // Удаляем дубликаты
  const uniqueFiles = Array.from(new Set(allFiles));

  logInfo(`Found ${uniqueFiles.length} file(s) to process`);

  let processedCount = 0;
  let changedCount = 0;
  let errorCount = 0;
  let totalChangesCount = 0;

  for (const filePath of uniqueFiles) {
    processedCount++;
    const result = processFile(filePath);
    if (result.changed) {
      changedCount++;
      totalChangesCount += result.changesCount;
    }
    if (result.error) {
      errorCount++;
    }
  }

  logInfo(`\nProcessing complete:`);
  logInfo(`  Total files processed: ${processedCount}`);
  logInfo(`  Files changed: ${changedCount}`);
  logInfo(`  Total URL replacements: ${totalChangesCount}`);
  if (errorCount > 0) {
    logError(`  Errors: ${errorCount}`);
  }

  if (errorCount > 0) {
    process.exit(1);
  }
})();
