import { FC } from 'react';

import { useLanguage } from '@sbercloud/uikit-utils';

interface CurrencyFormatterProps {
  value: number;
}

export const CurrencyFormatter: FC<CurrencyFormatterProps> = ({ value }) => {
  const { code: langCode } = useLanguage();

  return (
    <>
      {new Intl.NumberFormat(langCode, {
        style: 'currency',
        currency: 'RUB',
      }).format(value)}
    </>
  );
};
