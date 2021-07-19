import { FC } from 'react';

import { useLanguage } from '@sbercloud/uikit-utils';

interface NumberFormatterProps {
  value: number;
}

export const NumberFormatter: FC<NumberFormatterProps> = ({ value }) => {
  const { code: langCode } = useLanguage();

  return <>{new Intl.NumberFormat(langCode).format(value)}</>;
};
