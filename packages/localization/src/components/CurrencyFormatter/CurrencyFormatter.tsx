import { FC } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';

interface CurrencyFormatterProps {
  value: number;
}

export const CurrencyFormatter: FC<CurrencyFormatterProps> = ({ value }) => {
  const { languageCode } = useLanguage();

  return (
    <>
      {new Intl.NumberFormat(languageCode, {
        style: 'currency',
        currency: 'RUB',
      }).format(value)}
    </>
  );
};
