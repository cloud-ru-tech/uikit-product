const path = require('path');
const glob = require('glob');
const moment = require('moment');

const { logInfo, logHelp } = require('./utils/console');
const argv = require('minimist')(process.argv.slice(2));
const pkg = argv.pkg ? argv.pkg : '*';

const writeJs = require('./compile/write-js');
const transformJs = require('./compile/transform-js');
const { emitDeclarations, createTSProgram } = require('./compile/emit-declarations');

(async function () {
  let jsTiming = 0;
  let tsTiming = 0;
  let emitTiming = 0;

  console.log(`Compiling...`);

  const packages = `../packages/${pkg}`;

  const folders = glob.sync(`${path.resolve(__dirname, packages)}`);
  const distPart = 'dist';
  const srcPart = 'src';

  const tsStart = moment();
  const tsFiles = glob.sync(path.resolve(__dirname, `../packages/*/src/**/*.{ts,tsx}`));

  createTSProgram({ fileNames: tsFiles });

  tsTiming += moment().diff(tsStart, 'ms');

  for (const folder of folders) {
    const src = `${folder}/${srcPart}`;
    const dist = `${folder}/${distPart}`;
    const distESM = `${dist}/esm`;
    const distCJS = `${dist}/cjs`;

    const jsStart = moment();

    const jsFiles = glob.sync(`${src}/**/*.{ts,tsx,js,jsx}`);
    const jsPipe = writeJs({ src, distCJS, distESM });
    jsFiles.forEach(jsPipe(transformJs()));

    jsTiming += moment().diff(jsStart, 'ms');
    const emitStart = moment();

    emitDeclarations({
      src,
      distCJS,
      distESM,
      fileNames: jsFiles.filter(file => file.endsWith('.ts') || file.endsWith('.tsx')),
    });

    emitTiming += moment().diff(emitStart, 'ms');
  }

  const totalTiming = tsTiming + jsTiming + emitTiming;
  logInfo(`TS build has taken ${tsTiming}ms.`);
  logInfo(`JS build has taken ${jsTiming}ms.`);
  logInfo(`Types emitting has taken ${emitTiming}ms.`);
  logHelp(`Total ${totalTiming}ms.`);
})();
