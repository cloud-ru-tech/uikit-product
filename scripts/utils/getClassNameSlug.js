const getClassNameSlug = version => {
  return (hash, title) => `uikit-${title}-${version}-${hash}`;
};

module.exports = getClassNameSlug;
