import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SVGFixer, { FixerOptions } from 'oslllo-svg-fixer';
import path from 'path';

type CollectionConfig = {
  source: string;
  destination: string;
};

const COLLECTIONS: CollectionConfig[] = [
  {
    source: 'svgs/inherit/interface-icons-system',
    destination: 'svgs-fixed/interface-icons-system',
  },
  {
    source: 'svgs/inherit/interface-icons-product',
    destination: 'svgs-fixed/interface-icons-product',
  },
];

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

const processFiles = ({ source, destination }: CollectionConfig) => {
  const files = fs.readdirSync(source);

  for (const file of files) {
    const filePath = path.join(source, file);
    const dirName = path.basename(path.dirname(filePath));
    const destPath = path.join(destination, dirName);
    const stats = fs.statSync(filePath);

    stats.isDirectory() ? processFiles({ source: filePath, destination }) : fixIcons(filePath, destPath);
  }
};

COLLECTIONS.forEach(collection => {
  fs.mkdirSync(collection.destination);
  processFiles(collection);
});
