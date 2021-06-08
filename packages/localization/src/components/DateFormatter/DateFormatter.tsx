import { FC } from 'react';

import { useLanguage } from '../LanguageProvider';

interface DateFormatterProps {
  value: Date;
}

export const DateFormatter: FC<DateFormatterProps> = ({ value }) => {
  const langCode = useLanguage();
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
