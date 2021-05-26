const fs = require('fs');
const path = require('path');

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
    description: `${packageDescription}`,
    main: './dist/esm/index.js',
    module: './dist/esm/index.js',
    homepage: `https://bitbucket.sbercloud.tech/projects/SBERCLOUD_UI/repos/uikit2.0/browse/packages/${PackagesRootFolder}/${packageName}/README.md`,
    repository: {
      type: 'git',
      url: 'ssh://git@bitbucket.sbercloud.tech:7999/sbercloud_ui/uikit2.0.git',
    },
    author: `${user} <${email}>`,
    contributors: [`${user} <${email}>`],
    files: ['dist', 'src'],
    license: 'UNLICENSED',
    scripts: {},
    dependencies: {},
    devDependencies: {},
    peerDependencies: {
      '@linaria/core': '^3.0.0-beta.3',
      '@linaria/react': '^3.0.0-beta.3',
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

### v0.0.1

- Initial version
`;

  const file = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/CHANGELOG.md`);

  fs.writeFileSync(file, changelogContent);
};

const readme = ({ packageRootFolderName, packageTitle, packageDescription }) => {
  // Whitespace in this const is intentional, since it defines how the markdown is shown
  const readmeContent = `# ${packageTitle}

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
  const fileContent = `import { Story, Meta } from '@storybook/react/types-6-0';
import { ${componentName}, ${componentName}Props } from '../src/components';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
} as Meta;

const Template: Story<${componentName}Props> = ({ ...args }) => <${componentName} {...args} />;

export const ${componentName.toLowerCase()} = Template.bind({});
${componentName.toLowerCase()}.args = {};
${componentName.toLowerCase()}.argTypes = {};
${componentName.toLowerCase()}.parameters = {};
`;

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
