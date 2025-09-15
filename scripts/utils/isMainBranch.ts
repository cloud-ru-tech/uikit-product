export function isMainBranch() {
  const { CI_COMMIT_REF_NAME, CI_DEFAULT_BRANCH } = process.env;

  const isMainBranch = CI_COMMIT_REF_NAME === CI_DEFAULT_BRANCH;

  console.info(`'is main branch = ${isMainBranch}`);

  return isMainBranch;
}
