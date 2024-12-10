import { useEffect, useState } from 'react';

import { getOriginalUTM } from '../utils/getOriginalUTM';

const ObjectUTMToSend = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  retain_url: '',
  redirect_uri: '',
  zoneclick: '',
  nameelement: '',
};

export const useFormatConsoleUrl = (
  url: string,
  zoneclick: 'body' | 'header' | 'footer' | 'banner',
  elementText: string,
  redirectUri?: string,
) => {
  const [formattedURL, setFormattedURL] = useState<string>('');

  useEffect(() => {
    if (!window) return;
    const decodedOriginalUTM = getOriginalUTM();

    const objectUTM: Partial<Record<string, string>> = {};

    decodedOriginalUTM?.split('&')?.forEach(item => {
      const utmArr = item.split('=');
      objectUTM[utmArr[0]] = utmArr[1];
    });

    objectUTM.zoneclick = zoneclick;
    objectUTM.nameelement = elementText;
    objectUTM.retain_url = location.toString().replace(location.search, '');

    if (redirectUri) objectUTM.redirect_uri = redirectUri;

    let linkUTM = '';

    Object.keys(objectUTM).forEach(key => {
      if (key in ObjectUTMToSend) {
        linkUTM += `&${key}=${objectUTM[key]}`;
      }
    });

    setFormattedURL(`${url}${linkUTM ? `?${linkUTM.slice(1)}` : ''}`);
  }, [elementText, url, zoneclick, redirectUri]);

  return formattedURL;
};
