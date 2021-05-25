const shell = require('shelljs');
const { logError } = require('./console');

const getGitUserName = () => {
  const user = shell.exec('git config user.name', { silent: true }).stdout.trim();
  if (!user) {
    logError('No username set - please set it in git with \'git config --global user.name "Firstname Lastname"\'');
    process.exit(1);
  }
  return user;
};

const getGitEmail = () => {
  const email = shell.exec('git config user.email', { silent: true }).stdout.trim();
  if (!email) {
    logError('No email set - please set it in git with \'git config --global user.email "yoursemail@sbrecloud.ru"\'');
    process.exit(1);
  }
  return email;
};

const gitFetch = () => {
  return shell.exec('git fetch', { silent: true });
};

const checkIfBehindMaster = () => {
  const behindMaster = shell.exec('git log @..origin/master', { silent: true }).stdout.trim();

  if (behindMaster) {
    logError(
      'Looks like you are not up to date with origin/master - do a rebase and try again (git pull --rebase origin master)',
    );
    process.exit(1);
  }
};

const gitCommit = packageName => {
  shell.exec(`git add ./packages/${packageName}`);
  shell.exec(`git commit -m "initial commit for new package: ${packageName}" --no-verify`);
};

module.exports = {
  getGitEmail,
  getGitUserName,
  gitFetch,
  checkIfBehindMaster,
  gitCommit,
};
