import shell from 'shelljs';

const { CYPRESS_BROWSER } = process.env;

const browserArg = CYPRESS_BROWSER ? `--browser ${CYPRESS_BROWSER}` : '';

// next line is for future parallel tests
// shell.exec(`cy2 run --headless --parallel --record --key uikit ${browserArg}`, exitCode => shell.exit(exitCode));

shell.exec(`cypress run --headless --quiet ${browserArg}`, exitCode => shell.exit(exitCode));
