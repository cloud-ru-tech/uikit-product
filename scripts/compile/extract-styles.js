const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const normalize = require('normalize-path');
const { transform } = require('@linaria/babel-preset');

function resolveRequireInsertionFilename(filename) {
  return filename.replace(/\.tsx?/, '.js');
}

function resolveOutputFilename(filename, outDir, sourceRoot) {
  const outputFolder = path.relative(sourceRoot, path.dirname(filename));
  const outputBasename = path.basename(filename).replace(path.extname(filename), '.css');

  return path.join(outDir, outputFolder, outputBasename);
}

function extractStyles(options) {
  const { files, configFile, src, version, distESM } = options;

  files.forEach(filename => {
    const { cssText } = transform(fs.readFileSync(filename).toString(), {
      filename,
      pluginOptions: {
        classNameSlug: (hash, title) => `uikit-${title}-${version}-${hash}`,
        configFile,
      },
    });

    if (cssText) {
      const outputFilename = resolveOutputFilename(filename, distESM, src);

      mkdirp.sync(path.dirname(outputFilename));

      fs.writeFileSync(outputFilename, cssText);

      const inputFilename = path.resolve(distESM, path.relative(src, filename));

      const normalizedInputFilename = resolveRequireInsertionFilename(inputFilename);

      const relativePath = normalize(path.relative(path.dirname(inputFilename), outputFilename));

      const requireStatement = `import '${relativePath.startsWith('.') ? relativePath : `./${relativePath}`}';`;

      const inputContent = fs.readFileSync(normalizedInputFilename, 'utf-8');

      if (!inputContent.trim().startsWith(requireStatement)) {
        fs.writeFileSync(normalizedInputFilename, `${requireStatement}\n${inputContent}`);
      }
    }
  });
}

module.exports = extractStyles;
