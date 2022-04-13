import path from 'path';

const Nyc = require('nyc');
const tempDir = path.join(__dirname, '../../.nyc_output');
const coverageDir = path.join(__dirname, '../../cypress/coverage');

export function report({ name, include, reporter }: { name: string; include: string[]; reporter: string[] }) {
  const reportDir = path.join(coverageDir, name);
  const nyc = new Nyc({
    excludeAfterRemap: true,
    extension: ['.ts', '.tsx'],
    exclude: ['**/+(index|styled|themes|types|constants).*', '**/+(types|constants)/*'],
    reporter,
    include,
    tempDir,
    reportDir,
  });

  nyc.report();
}
