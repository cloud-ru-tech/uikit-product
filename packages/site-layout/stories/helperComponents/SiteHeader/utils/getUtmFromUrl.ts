// href - window.location.href
export const getUtmFromUrl = (href: string) => {
  if (!href) return '';
  // фильтруем location search на то что там есть UTM,
  // а не что-то другое типа ?product=virtual-datacenter
  const regexCheckUtm = new RegExp(/utm_/);
  const hrefWithUtm = regexCheckUtm.test(href) ? href : null;
  if (!hrefWithUtm) return '';
  //
  const regexGetUtm = new RegExp(/utm_(.*)(?=\#)/);
  const utmWithHash = regexGetUtm.exec(hrefWithUtm + '#');
  if (!utmWithHash || !utmWithHash?.[0]) return '';
  //
  const regexGetHash = new RegExp(/\#(.*)/);
  const utm = utmWithHash[0].replace(regexGetHash, '');
  //
  return utm;
};
