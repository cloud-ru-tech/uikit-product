import { FC } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';

interface DateFormatterProps {
  value: Date;
  showTime?: boolean;
}

export const DateFormatter: FC<DateFormatterProps> = ({ value, showTime = true }) => {
  const { languageCode } = useLanguage();

  if (!showTime) {
    return (
      <>
        {new Intl.DateTimeFormat(languageCode, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(value)}
      </>
    );
  }

  return (
    <>
      {new Intl.DateTimeFormat(languageCode, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(value)}
    </>
  );
};
