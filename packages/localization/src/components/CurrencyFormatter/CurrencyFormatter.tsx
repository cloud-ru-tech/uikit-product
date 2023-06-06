import { useLanguage } from '@sbercloud/uikit-product-utils';

type CurrencyFormatterProps = {
  value: number;
};

export function CurrencyFormatter({ value }: CurrencyFormatterProps) {
  const { languageCode } = useLanguage();

  return (
    <>
      {new Intl.NumberFormat(languageCode, {
        style: 'currency',
        currency: 'RUB',
      }).format(value)}
    </>
  );
}
