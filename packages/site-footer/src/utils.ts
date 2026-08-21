export function isExternalUrl(url?: string) {
  return Boolean(url) && !url?.startsWith('/');
}
