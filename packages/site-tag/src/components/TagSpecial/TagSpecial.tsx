import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { PromoTag } from '@snack-uikit/promo-tag';

import { Tooltip } from '../../helperComponents';
import { Appearance } from '../../types';

export type TagSpecialProps = WithSupportProps<{
  text: string;
  appearance: Appearance;
  tip?: ReactNode;
  className?: string;
}>;

export function TagSpecial({ text, appearance = 'neutral', tip, className, ...rest }: TagSpecialProps) {
  return (
    <PromoTag
      size='xs'
      text={text}
      appearance={appearance}
      color='decor'
      afterContent={tip && <Tooltip appearance={appearance} tip={tip} />}
      className={className}
      {...extractSupportProps(rest)}
    />
  );
}
