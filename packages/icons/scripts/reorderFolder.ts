import fs from 'fs/promises';
import path from 'path';

const SOURCE_PATH = path.resolve(__dirname, '../svgs/inherit/interface-icons-product');
const DEST_PATH = path.resolve(__dirname, '../svgs/inherit/interface-icons-product-new');

async function main() {
  const content = await fs.readdir(SOURCE_PATH);
  const components = content.filter(name => !name.includes('.'));

  for (const component of components) {
    const componentPath = path.resolve(SOURCE_PATH, component);

    const componentFiles = await fs.readdir(componentPath);
    const svgFileName = componentFiles.find(file => file.endsWith('.svg'));

    if (svgFileName) {
      await fs.cp(path.resolve(componentPath, svgFileName), path.resolve(DEST_PATH, `${component}.svg`));
    }
  }
}

main().catch(console.error);
