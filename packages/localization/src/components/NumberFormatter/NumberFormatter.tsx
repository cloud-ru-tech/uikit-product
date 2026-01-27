import { useLocale } from '@cloud-ru/uikit-product-locale';

type NumberFormatterProps = {
  value: number;
};

export function NumberFormatter({ value }: NumberFormatterProps) {
  const { lang } = useLocale();

  return <>{new Intl.NumberFormat(lang).format(value)}</>;
}
