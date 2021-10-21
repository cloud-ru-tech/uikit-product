import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Variants } from './constants';
import * as S from './styled';

export type MarkerProps = {
  text: string;
  variant: Variants;
  className?: string;
};

export function Marker({ text, variant, className, ...rest }: WithSupportProps<MarkerProps>) {
  return (
    <S.Marker {...extractSupportProps(rest)} className={className} data-variant={variant}>
      {text}
    </S.Marker>
  );
}

Marker.variants = Variants;
