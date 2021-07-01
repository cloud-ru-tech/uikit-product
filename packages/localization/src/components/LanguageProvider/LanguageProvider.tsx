import { useEffect, useLayoutEffect, useState } from 'react';

import { LanguageCodeType } from '../../types/general';

interface LanguageProvider {
  languageCode?: LanguageCodeType;
}

const DEFAULT_LANGUAGE = window.navigator.language as LanguageCodeType;

const customWindow: {
  sbercloudUIKit?: { languageCode?: LanguageCodeType };
} = window as {
  sbercloudUIKit?: { languageCode?: LanguageCodeType };
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

interface useLanguageProps {
  onlyEnabledLanguage?: boolean;
}

export const useLanguage = (props?: useLanguageProps) => {
  const [code, setCode] = useState<LanguageCodeType>(customWindow.sbercloudUIKit?.languageCode || DEFAULT_LANGUAGE);
  const onlyEnabledLanguage = props?.onlyEnabledLanguage;

  useEffect(() => {
    const newCode = customWindow.sbercloudUIKit?.languageCode;
    if (newCode !== code) {
      setCode(newCode || DEFAULT_LANGUAGE);
    }
  }, [customWindow.sbercloudUIKit?.languageCode]);

  useLayoutEffect(() => {
    if (onlyEnabledLanguage) {
      const enGroup = code.split('-')[0] === 'en';
      const ruGroup = ['ru', 'be'].includes(code.split('-')[0]);
      if (enGroup) {
        setCode(LanguageCodeType.enGB);
        return;
      }
      if (ruGroup) {
        setCode(LanguageCodeType.ruRU);
        return;
      }
      setCode(LanguageCodeType.ruRU);
    }
  }, [code, onlyEnabledLanguage]);

  return code;
};
