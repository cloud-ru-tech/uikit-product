import { useLanguage } from '@sbercloud/uikit-product-utils';

type NumberFormatterProps = {
  value: number;
};

export function NumberFormatter({ value }: NumberFormatterProps) {
  const { languageCode } = useLanguage();

  return <>{new Intl.NumberFormat(languageCode).format(value)}</>;
}
