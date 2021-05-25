const babel = require('@babel/core');
const path = require('path');

module.exports = () => file => {
  console.log(`BABEL transforming: ${file}...`);
  const { code: esm, ast } = babel.transformFileSync(file, {
    ast: true,
    filename: file,
    configFile: path.resolve(process.cwd(), 'esm.babel.config.js'),
  });
  const { code: cjs } = babel.transformFromAst(ast, esm, {
    filename: file,
    configFile: path.resolve(process.cwd(), 'cjs.babel.config.js'),
  });

  return {
    cjs,
    esm,
  };
};
