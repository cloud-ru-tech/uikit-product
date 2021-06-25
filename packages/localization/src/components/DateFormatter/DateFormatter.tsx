import { FC } from 'react';

import { useLanguage } from '../LanguageProvider';

interface DateFormatterProps {
  value: Date;
  showTime?: boolean;
}

export const DateFormatter: FC<DateFormatterProps> = ({ value, showTime = true }) => {
  const langCode = useLanguage();

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
