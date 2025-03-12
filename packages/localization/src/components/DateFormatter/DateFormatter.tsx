import { useLocale } from '@sbercloud/uikit-product-locale';

type DateFormatterProps = {
  value: Date;
  showTime?: boolean;
};

export function DateFormatter({ value, showTime = true }: DateFormatterProps) {
  const { lang } = useLocale();

  if (!showTime) {
    return (
      <>
        {new Intl.DateTimeFormat(lang, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(value)}
      </>
    );
  }

  return (
    <>
      {new Intl.DateTimeFormat(lang, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(value)}
    </>
  );
}
