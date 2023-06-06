import { useLanguage } from '@sbercloud/uikit-product-utils';

type DateFormatterProps = {
  value: Date;
  showTime?: boolean;
};

export function DateFormatter({ value, showTime = true }: DateFormatterProps) {
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
}
