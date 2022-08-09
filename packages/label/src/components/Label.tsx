import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Variants } from './constants';
import * as S from './styled';

export type LabelProps = WithSupportProps<{
  text: string;
  variant: Variants;
  className?: string;
}>;

export function Label({ text, variant, className, ...rest }: LabelProps) {
  return (
    <S.Label {...extractSupportProps(rest)} className={className} data-variant={variant}>
      {text}
    </S.Label>
  );
}

Label.variants = Variants;
