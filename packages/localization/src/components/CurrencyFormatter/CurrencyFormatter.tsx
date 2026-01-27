import { useLocale } from '@cloud-ru/uikit-product-locale';

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
