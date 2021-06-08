import React, { useEffect, useLayoutEffect, useState } from 'react';

import { LanguageCodeType } from '../../types/general';

interface LanguageProvider {
  languageCode?: LanguageCodeType;
}

const DEFAULT_LANGUAGE = window.navigator.language;

const customWindow: {
  sbercloudUIKit?: { languageCode?: string };
} = window as {
  sbercloudUIKit?: { languageCode?: string };
};

if (!customWindow.sbercloudUIKit) {
  customWindow.sbercloudUIKit = {};
}

export const LanguageProvider: React.FC<LanguageProvider> = ({ languageCode, children }) => {
  useLayoutEffect(() => {
    customWindow.sbercloudUIKit = {
      languageCode: languageCode || DEFAULT_LANGUAGE,
    };
  }, [languageCode]);

  return <>{children}</>;
};

export const useLanguage = () => {
  const [code, setCode] = useState(customWindow.sbercloudUIKit?.languageCode || DEFAULT_LANGUAGE);

  useEffect(() => {
    const newCode = customWindow.sbercloudUIKit?.languageCode;
    if (newCode !== code) setCode(newCode || DEFAULT_LANGUAGE);
  }, [customWindow.sbercloudUIKit?.languageCode]);
  return code;
};
