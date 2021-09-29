import { FC } from 'react';

import { useLanguage } from '@sbercloud/uikit-utils';

interface NumberFormatterProps {
  value: number;
}

export const NumberFormatter: FC<NumberFormatterProps> = ({ value }) => {
  const { languageCode } = useLanguage();

  return <>{new Intl.NumberFormat(languageCode).format(value)}</>;
};
