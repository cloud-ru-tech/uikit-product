import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { PromoTag, PromoTagProps } from '@snack-uikit/promo-tag';

import { APPEARANCE_TO_COLOR_MAP } from '../constants';
import { Tooltip } from '../Tooltip';

export type TagSpecialProps = WithSupportProps<{
  text: string;
  size: Exclude<PromoTagProps['size'], 'xxs' | undefined>;
  appearance: NonNullable<Exclude<PromoTagProps['appearance'], 'primary'>>;
  tip?: ReactNode;
  className?: string;
}>;

export function TagSpecial({ text, size, appearance = 'neutral', tip, className, ...rest }: TagSpecialProps) {
  return (
    <PromoTag
      size={size}
      text={text}
      appearance={appearance}
      color='decor'
      afterContent={tip && <Tooltip appearance={APPEARANCE_TO_COLOR_MAP[appearance]} tip={tip} />}
      className={className}
      {...extractSupportProps(rest)}
    />
  );
}
