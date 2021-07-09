const path = require('path');
const glob = require('glob');
const moment = require('moment');

const { logInfo, logHelp } = require('./utils/console');
const argv = require('minimist')(process.argv.slice(2));
const pkg = argv.pkg || '*';

const writeJs = require('./compile/write-js');
const transformJs = require('./compile/transform-js');
const sortFolders = require('./compile/sort-folders');
const simpleCopy = require('./compile/simple-copy');
const extractStyles = require('./compile/extract-styles');
const { emitDeclarations, createTSProgram } = require('./compile/emit-declarations');

(async function () {
  let jsTiming = 0;
  let tsTiming = 0;
  let emitTiming = 0;
  let simpleCopyTiming = 0;
  let stylesTiming = 0;

  console.log(`Compiling...`);

  const packages = `../packages/${pkg}`;

  const folders = glob.sync(`${path.resolve(__dirname, packages)}`);
  const linariaConfig = path.resolve(__dirname, '../linaria.config.js');
  const distPart = 'dist';
  const srcPart = 'src';

  const tsStart = moment();
  const tsFiles = glob.sync(path.resolve(__dirname, `../packages/*/src/**/*.{ts,tsx}`));

  await createTSProgram({ fileNames: tsFiles });

  tsTiming += moment().diff(tsStart, 'ms');

  const sortedFolders = sortFolders(folders);

  for (const folder of sortedFolders) {
    const package = require(`${folder}/package.json`);
    const src = `${folder}/${srcPart}`;
    const dist = `${folder}/${distPart}`;
    const distESM = `${dist}/esm`;
    const distCJS = `${dist}/cjs`;

    const jsStart = moment();

    const jsFiles = glob.sync(`${src}/**/*.{ts,tsx,js,jsx}`);
    const jsPipe = writeJs({ src, distCJS, distESM });
    jsFiles.forEach(jsPipe(transformJs()));

    jsTiming += moment().diff(jsStart, 'ms');

    const copyStart = moment();
    const filesToCopy = glob.sync(`${src}/**/*.{woff,woff2,png}`);

    filesToCopy.forEach(simpleCopy({ src, dist, distCJS, distESM }));
    simpleCopyTiming += moment().diff(copyStart, 'ms');

    const emitStart = moment();

    emitDeclarations({
      src,
      distCJS,
      distESM,
      fileNames: jsFiles.filter(file => file.endsWith('.ts') || file.endsWith('.tsx')),
    });

    emitTiming += moment().diff(emitStart, 'ms');

    const stylesStart = moment();

    extractStyles({
      files: jsFiles,
      configFile: linariaConfig,
      version: package.version,
      distESM,
      distCJS,
      src,
    });

    stylesTiming += moment().diff(stylesStart, 'ms');
  }

  const totalTiming = tsTiming + jsTiming + emitTiming + simpleCopyTiming + stylesTiming;
  logInfo(`TS build has taken ${tsTiming}ms.`);
  logInfo(`JS build has taken ${jsTiming}ms.`);
  logInfo(`Copying files has taken ${simpleCopyTiming}ms.`);
  logInfo(`Types emitting has taken ${emitTiming}ms.`);
  logInfo(`Styles extraction has taken ${stylesTiming}ms.`);
  logHelp(`Total ${totalTiming}ms.`);
})();
