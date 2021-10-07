export function getClassNameSlug(version: string) {
  return function (hash: string, title: string) {
    return `uikit-${title}-${version}-${hash}`;
  };
}
