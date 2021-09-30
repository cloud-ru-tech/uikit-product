const path = require('path');
const fs = require('fs');
const ts = require('typescript');

const ensureDirectory = require('../utils/ensureDirectory');

const createdFiles = {};

function createTSProgram({ fileNames }) {
  const options = {
    declaration: true,
    emitDeclarationOnly: true,
    esModuleInterop: true,
    jsx: 'react-jsx',
    paths: {
      '@sbercloud/uikit-typography': ['packages/typography/src'],
      '@sbercloud/uikit-theme': ['packages/theme/src'],
      '@sbercloud/uikit-utils': ['packages/utils/src'],
      '@sbercloud/uikit-react-*': ['packages/*/src'],
    },
  };

  const host = ts.createCompilerHost(options);
  host.writeFile = (fileName, contents) => (createdFiles[fileName] = contents);

  const program = ts.createProgram(fileNames, options, host);
  program.emit();
}

function emitDeclarations({ src, distCJS, distESM, fileNames }) {
  fileNames.forEach(file => {
    const relativePathToSrcFile = path.relative(src, file);
    const dirname = path.dirname(relativePathToSrcFile);
    const extension = path.extname(relativePathToSrcFile);
    const basename = path.basename(relativePathToSrcFile, extension);
    const filename = path.join(dirname, `${basename}.d.ts`);

    const cjsOutFile = path.resolve(distCJS, filename);
    const esmOutFile = path.resolve(distESM, filename);

    const dts = file.replace(extension, '.d.ts');
    const dtsContent = createdFiles[dts];

    ensureDirectory(cjsOutFile);
    ensureDirectory(esmOutFile);

    fs.writeFileSync(cjsOutFile, dtsContent);
    fs.writeFileSync(esmOutFile, dtsContent);
  });
}

module.exports = {
  emitDeclarations,
  createTSProgram,
};
