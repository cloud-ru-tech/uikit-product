const fs = require('fs');
const path = require('path');
const themeVersion = require('../../packages/theme/package.json').version;

const PackagesRootFolder = 'packages';

const Folders = {
  root: '/',
  src: '/src',
  stories: '/stories',
  srcComponents: '/src/components',
};

const createFolderStructure = ({ packageRootFolderName }) => {
  for (const folder in Folders) {
    fs.mkdirSync(`./${PackagesRootFolder}/${packageRootFolderName}/${Folders[folder]}`);
  }
};

const packageJson = ({ user, email, packageTitle, packageName, packageDescription, packageRootFolderName }) => {
  const config = {
    name: `@sbercloud/uikit-${packageName}`,
    title: `${packageTitle}`,
    version: '0.0.0',
    sideEffects: ['*.css', '*.woff', '*.woff2'],
    description: `${packageDescription}`,
    main: './dist/esm/index.js',
    module: './dist/esm/index.js',
    homepage: `https://git.sbercloud.tech/sbercloud-ui/uikit2.0/-/tree/master/packages/${packageRootFolderName}`,
    repository: {
      type: 'git',
      url: 'https://git.sbercloud.tech/sbercloud-ui/uikit2.0.git',
    },
    author: `${user} <${email}>`,
    contributors: [`${user} <${email}>`],
    files: ['dist', 'src'],
    license: 'UNLICENSED',
    scripts: {},
    dependencies: {
      '@sbercloud/uikit-theme': themeVersion,
    },
    devDependencies: {},
    peerDependencies: {
      '@linaria/core': '^3.0.0-beta.13',
      '@linaria/react': '^3.0.0-beta.13',
      react: '^17.0.0',
      'react-dom': '^17.0.0',
    },
  };

  const packageJsonFile = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/package.json`);

  fs.writeFileSync(packageJsonFile, JSON.stringify(config, null, 2));
};

const changelog = ({ packageRootFolderName }) => {
  // Whitespace in this const is intentional, since it defines how the markdown is shown
  const changelogContent = `## CHANGELOG

### v0.0.0

- Initial version
`;

  const file = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/CHANGELOG.md`);

  fs.writeFileSync(file, changelogContent);
};

const readme = ({ packageRootFolderName, packageTitle, packageDescription, packageName }) => {
  // Whitespace in this const is intentional, since it defines how the markdown is shown
  const readmeContent = `# ${packageTitle}

## Installation
\`npm i @sbercloud/uikit-${packageName}\`

[Changelog](./CHANGELOG.md)

${packageDescription}
`;

  const readmeFile = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/README.md`);

  fs.writeFileSync(readmeFile, readmeContent);
};

const npmrc = ({ packageRootFolderName }) => {
  const fileContent = `package-lock=false
save-exact=true
`;
  fs.writeFileSync(path.join(`./${PackagesRootFolder}/${packageRootFolderName}/.npmrc`), fileContent);
};

const componentEntry = ({ componentName, packageRootFolderName }) => {
  const indexFilePath = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/${Folders.srcComponents}/index.ts`);

  const indexFileContent = `export * from './${componentName}';
`;
  const componentFilePath = path.join(
    `./${PackagesRootFolder}/${packageRootFolderName}/${Folders.srcComponents}/${componentName}.tsx`,
  );
  const componentFileContent = `export type ${componentName}Props = any;

export function ${componentName}(props: ${componentName}Props) {
  return <div />;
}
`;

  fs.writeFileSync(indexFilePath, indexFileContent);
  fs.writeFileSync(componentFilePath, componentFileContent);
};

const packageEntry = ({ packageRootFolderName }) => {
  const filePath = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/${Folders.src}/index.ts`);

  const fileContent = `export * from './components';
`;

  fs.writeFileSync(filePath, fileContent);
};

const storyEntry = ({ componentName, packageRootFolderName }) => {
  const filePath = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/${Folders.stories}/index.tsx`);
  const fileContent =
    "import { Story, Meta } from '@storybook/react/types-6-0';\n\
import { " +
    `${componentName}, ${componentName}Props` +
    " } from '../src';\n\
\n\
import componentReadme from '../README.md';\n\
import componentChangelog from '../CHANGELOG.md';\n\
import componentPackage from '../package.json';\n\
\n\
export default {\n\
  title: 'Not stable/" +
    `${componentName}` +
    "',\n\
  component: " +
    `${componentName}` +
    ',\n\
} as Meta;\n\
\n' +
    `const Template: Story<${componentName}Props> = ({ ...args }) => <${componentName} {...args} />;

` +
    'export const ' +
    `${componentName.replace(/[A-Z]/, x => x.toLowerCase())}` +
    ' = Template.bind({});\n\
' +
    `${componentName.toLowerCase()}` +
    '.args = {};\n\
' +
    `${componentName.toLowerCase()}` +
    '.argTypes = {};\n\
' +
    `${componentName.toLowerCase()}` +
    ".parameters = {\n\
  readme: {\n\
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],\n\
  },\n\
  design: {\n\
    name: 'Figma',\n\
    type: 'figma',\n\
    //TODO\n\
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',\n\
  },\n\
};\n\
";

  fs.writeFileSync(filePath, fileContent);
};

module.exports = {
  createFolderStructure,
  packageJson,
  changelog,
  readme,
  npmrc,
  packageEntry,
  componentEntry,
  storyEntry,
};
