import { FC } from 'react';

import { useLanguage } from '@sbercloud/uikit-utils';

interface DateFormatterProps {
  value: Date;
  showTime?: boolean;
}

export const DateFormatter: FC<DateFormatterProps> = ({ value, showTime = true }) => {
  const { code: langCode } = useLanguage();

  if (!showTime) {
    return (
      <>
        {new Intl.DateTimeFormat(langCode, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(value)}
      </>
    );
  }

  return (
    <>
      {new Intl.DateTimeFormat(langCode, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(value)}
    </>
  );
};
