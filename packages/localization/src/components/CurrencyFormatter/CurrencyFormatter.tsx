import { FC } from 'react';

import { useLanguage } from '../LanguageProvider';

interface CurrencyFormatterProps {
  value: number;
}

export const CurrencyFormatter: FC<CurrencyFormatterProps> = ({ value }) => {
  const langCode = useLanguage();

  return (
    <>
      {new Intl.NumberFormat(langCode, {
        style: 'currency',
        currency: 'RUB',
      }).format(value)}
    </>
  );
};
