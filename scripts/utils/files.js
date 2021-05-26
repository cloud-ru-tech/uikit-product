const fs = require('fs');
const path = require('path');

const { logInfo } = require('./console');
const fileTemplates = require('./filesTemplate');

const updateGlobalReadme = ({ packageRootFolderName, packageTitle }) => {
  const readme = path.resolve(process.cwd(), 'README.md');
  fs.appendFileSync(
    readme,
    `* [${packageTitle}](./packages/${packageRootFolderName}/README.md) [(Changelog)](./packages/${packageRootFolderName}/CHANGELOG.md)
`,
  );
};

const ExistingPackageNames = (() => fs.readdirSync('./packages/'))();

const bootstrapFiles = ({
  packageRootFolderName,
  packageName,
  packageTitle,
  packageDescription,
  user,
  email,
  componentName,
}) => {
  fileTemplates.createFolderStructure({ packageRootFolderName });
  logInfo('Created folder structure');

  fileTemplates.changelog({ packageRootFolderName });
  logInfo('Created changelog');

  fileTemplates.readme({
    packageRootFolderName,
    packageTitle,
    packageDescription,
  });
  logInfo('Created readme');

  fileTemplates.npmrc({ packageRootFolderName });
  logInfo('Created .npmrc');

  fileTemplates.packageJson({
    packageRootFolderName,
    user,
    email,
    packageTitle,
    packageName,
    packageDescription,
  });
  logInfo('Created package.json');

  fileTemplates.packageEntry({
    packageRootFolderName,
  });
  logInfo('Created package entry');

  fileTemplates.componentEntry({
    componentName,
    packageRootFolderName,
  });
  logInfo('Created component entry');

  fileTemplates.storyEntry({
    componentName,
    packageRootFolderName,
  });
  logInfo('Created story entry');
};

module.exports = {
  bootstrapFiles,
  ExistingPackageNames,
  updateGlobalReadme,
};
