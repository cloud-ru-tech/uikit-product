const colors = require('colors/safe');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});

const log = (message, theme = 'yellow') => {
  console.log(colors[theme](`${message}\n`));
};

const logError = message => log(message, 'error');
const logInfo = message => log(message, 'info');
const logHelp = message => log(message, 'help');
const logSilly = message => log(message, 'silly');
const logDebug = message => log(message, 'debug');

module.exports = {
  log,
  logError,
  logInfo,
  logHelp,
  logSilly,
  logDebug,
};
