import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Variants } from './constants';
import * as S from './styled';

export type MarkerProps = WithSupportProps<{
  text: string;
  variant: Variants;
  className?: string;
}>;

export function Marker({ text, variant, className, ...rest }: MarkerProps) {
  return (
    <S.Marker {...extractSupportProps(rest)} className={className} data-variant={variant}>
      {text}
    </S.Marker>
  );
}

Marker.variants = Variants;
