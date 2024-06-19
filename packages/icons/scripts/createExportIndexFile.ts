import fs from 'fs';
import path from 'path';

import yargs from 'yargs';

function createExportIndexFile(folderPath: string, outputFile: string) {
  const folders = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const exports = folders.map(folderName => `export { default as ${folderName}SVG } from './${folderName}'`).join('\n');

  fs.writeFileSync(outputFile, exports);
}

async function main() {
  const argv = await yargs(process.argv.slice(2)).argv;
  const workingDirectory = argv['folder'] as string;

  if (!workingDirectory) {
    // eslint-disable-next-line no-console
    console.log('Error: folder param is required');
    return;
  }

  try {
    const folderPath = path.resolve(__dirname, '../', workingDirectory);
    const indexFilePath = path.resolve(workingDirectory, 'index.ts');

    createExportIndexFile(folderPath, indexFilePath);

    // eslint-disable-next-line no-console
    console.log('Export icons files created.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error: ', err);
  }
}

// eslint-disable-next-line no-console
main().catch(console.log);
