import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SVGFixer, { FixerOptions } from 'oslllo-svg-fixer';
import path from 'path';

import yargs from 'yargs';

type CollectionConfig = {
  source: string;
  destination: string;
  folder?: string;
};

const FIXER_OPTION: FixerOptions = {
  // другие настройки тут - https://docs.oslllo.com/svg-fixer/master/#/getting-started/basic-usage?id=parameters
  throwIfDestinationDoesNotExist: false,
};

const fixIcons = async (source: string, destination: string) => {
  try {
    const report = await new SVGFixer(source, destination, FIXER_OPTION).fix();
    // eslint-disable-next-line no-console
    console.log(report.location.original.source, '- в работе');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};

const processFiles = ({ source, destination, folder = '' }: CollectionConfig) => {
  const files = fs.readdirSync(path.resolve(source, folder));

  for (const file of files) {
    const filePath = path.resolve(source, folder, file);
    const destPath = path.resolve(destination, folder);

    fs.statSync(filePath).isDirectory()
      ? processFiles({ source, destination, folder: path.join(folder, file) })
      : fixIcons(filePath, destPath);
  }
};

async function main() {
  const argv = await yargs(process.argv.slice(2)).argv;

  const collection = {
    source: argv['source'] as string,
    destination: argv['destination'] as string,
  };

  fs.mkdirSync(collection.destination);
  processFiles(collection);
}

main().catch(console.error);
