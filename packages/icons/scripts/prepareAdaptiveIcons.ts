/* eslint-disable no-console */

import fs from 'fs/promises';
import path from 'path';

import yargs from 'yargs';

type IconsDict = Record<string, { light: string; dark: string }>;
type OptimizedIconsDict = Record<string, { light: string; dark?: string }>;

/**
 * Figma exports backdrop blur via foreignObject + HTML div with xmlns.
 * SVGR turns this into invalid JSX for React types, so we drop these nodes.
 */
function sanitizeSvgContent(content: string): string {
  return content.replace(/<foreignObject[^>]*>[\s\S]*?<\/foreignObject>/g, '');
}

/**
 * Строит мапу иконок, в ключе название иконки а в полях light и dark пути до файлов.
 */
async function getIconsDictionary(): Promise<IconsDict> {
  const argv = await yargs(process.argv.slice(2)).argv;
  const source = argv['source'] as string;
  const dest = argv['destination'] as string;

  if (!source || !dest) {
    throw new Error('source and destination are required');
  }

  const iconsDict: IconsDict = {};

  const workingDir = path.resolve(__dirname, '../');

  const files = await fs.readdir(path.resolve(workingDir, source));

  for (const fullFileName of files) {
    if (!fullFileName.endsWith('.svg')) {
      continue;
    }

    const fileName = fullFileName.replace('.svg', '');

    if (fileName.endsWith('Light')) {
      const iconName = fileName.replace('Light', '');
      iconsDict[iconName] = Object.assign({}, iconsDict[iconName], {
        light: path.resolve(workingDir, source, fullFileName),
      });
    } else if (fileName.endsWith('Dark')) {
      const iconName = fileName.replace('Dark', '');
      iconsDict[iconName] = Object.assign({}, iconsDict[iconName], {
        dark: path.resolve(workingDir, source, fullFileName),
      });
    } else {
      throw new Error(`File: ${fileName} has a wrong name. It should be [IconName]Light or [IconName]Dark`);
    }
  }

  return iconsDict;
}

/**
 * Заполняет мапу иконок, в ключе название иконки а в полях light и dark содержимое файлов.
 * Если содержимое light и dark совпадают, то dark удаляется.
 */
async function optimise(dict: IconsDict): Promise<OptimizedIconsDict> {
  return Promise.all(
    Object.keys(dict).map(icon =>
      Promise.all([fs.readFile(dict[icon].light, 'utf8'), fs.readFile(dict[icon].dark, 'utf8')])
        .then(([lightFileContent, darkFileContent]) => {
          const light = sanitizeSvgContent(lightFileContent);
          const dark = sanitizeSvgContent(darkFileContent);

          return light === dark ? { [icon]: { light } } : { [icon]: { light, dark } };
        })
        .catch(err => {
          console.log(`Error during reading files of '${icon}' files.`);
          throw err;
        }),
    ),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ).then(result => Object.assign(...result));
}

/**
 * Записывает файлы иконок в папку.
 */
async function writeFiles(dict: OptimizedIconsDict): Promise<void> {
  const argv = await yargs(process.argv.slice(2)).argv;
  const dest = argv['destination'] as string;
  const destinationPath = path.resolve(__dirname, '../', dest);

  await Promise.all(
    Object.keys(dict).map(async icon => {
      const { light, dark } = dict[icon];

      await fs.mkdir(path.resolve(destinationPath, icon), { recursive: true });

      const writing = [fs.writeFile(path.resolve(destinationPath, icon, `${icon}Light.svg`), light, 'utf8')];

      if (dark) {
        writing.push(fs.writeFile(path.resolve(destinationPath, icon, `${icon}Dark.svg`), dark, 'utf8'));
      }

      return Promise.all(writing).then(() =>
        console.log(`Icon "${icon}" has been written with ${dark ? 'light and dark modes' : 'light mode'}.`),
      );
    }),
  );
}

async function main() {
  await getIconsDictionary().then(optimise).then(writeFiles);
}

main().catch(console.error);
