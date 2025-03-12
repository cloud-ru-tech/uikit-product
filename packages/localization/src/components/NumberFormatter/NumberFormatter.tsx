import { useLocale } from '@sbercloud/uikit-product-locale';

type NumberFormatterProps = {
  value: number;
};

export function NumberFormatter({ value }: NumberFormatterProps) {
  const { lang } = useLocale();

  return <>{new Intl.NumberFormat(lang).format(value)}</>;
}
