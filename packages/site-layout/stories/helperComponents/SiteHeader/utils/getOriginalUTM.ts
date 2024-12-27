import { getUtmFromUrl } from './getUtmFromUrl';

export const getOriginalUTM = () => {
  const originalUTM =
    getUtmFromUrl(window.location.href) === ''
      ? window.localStorage.getItem('originalUTM')
      : getUtmFromUrl(window.location.href);

  let decodedOriginalUTM = '-';

  if (originalUTM) {
    try {
      decodedOriginalUTM = decodeURI(originalUTM);
    } catch {
      decodedOriginalUTM = originalUTM;
    }
  }

  return decodedOriginalUTM;
};
