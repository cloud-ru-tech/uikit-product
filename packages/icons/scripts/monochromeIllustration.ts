import fs from 'fs/promises';
import path from 'path';

import yargs from 'yargs';

import { replaceColorsWithValue } from './utils';
const rootPath = path.resolve(__dirname, '..');

async function main() {
  const argv = await yargs(process.argv.slice(2)).argv;

  const source = argv['source'] as string;
  const destination = argv['destination'] as string;

  await fs.mkdir(path.resolve(rootPath, destination));

  const files = await fs.readdir(path.resolve(rootPath, source));

  for (const file of files) {
    if (!file.endsWith('.svg')) {
      continue;
    }

    const svgFile = await fs.readFile(path.resolve(rootPath, source, file), 'utf-8');

    // eslint-disable-next-line no-console
    console.log(`Convert to monochrome: ${path.resolve(rootPath, destination, file)} - done.`);

    await fs.writeFile(path.resolve(rootPath, destination, file), replaceColorsWithValue(svgFile), 'utf-8');
  }
}

main().catch(console.error);
