import { useLocale } from '@sbercloud/uikit-product-locale';

type CurrencyFormatterProps = {
  value: number;
};

export function CurrencyFormatter({ value }: CurrencyFormatterProps) {
  const { lang } = useLocale();

  return (
    <>
      {new Intl.NumberFormat(lang, {
        style: 'currency',
        currency: 'RUB',
      }).format(value)}
    </>
  );
}
