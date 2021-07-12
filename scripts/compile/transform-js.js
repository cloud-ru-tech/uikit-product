const babel = require('@babel/core');
const path = require('path');

module.exports = version => file => {
  console.log(`BABEL transforming: ${file}...`);

  const esmConfig = require(path.resolve(process.cwd(), 'esm.babel.config.js'))(version);

  const { code: esm, ast } = babel.transformFileSync(file, {
    ast: true,
    filename: file,
    ...esmConfig,
  });

  const cjsConfig = require(path.resolve(process.cwd(), 'cjs.babel.config.js'))(version);

  const { code: cjs } = babel.transformFromAst(ast, esm, {
    filename: file,
    ...cjsConfig,
  });

  return {
    cjs,
    esm,
  };
};
