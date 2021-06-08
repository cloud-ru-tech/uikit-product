import { FC } from 'react';

import { useLanguage } from '../LanguageProvider';

interface NumberFormatterProps {
  value: number;
}

export const NumberFormatter: FC<NumberFormatterProps> = ({ value }) => {
  const langCode = useLanguage();

  return <>{new Intl.NumberFormat(langCode).format(value)}</>;
};
