import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Icon } from '../../constants';
import { PredefinedIcon } from '../../helperComponents';
import { Variants } from './constants';
import { Wrapper } from './styled';

export type PredefinedIconsPrivateProps = WithSupportProps<{
  icon: Icon;
  variant?: Variants;
  className?: string;
}>;

export function PredefinedIconsPrivate({
  icon,
  variant = Variants.Primary,
  className,
  ...rest
}: PredefinedIconsPrivateProps) {
  return (
    <Wrapper className={className} data-icon={icon} data-variant={variant} {...extractSupportProps(rest)}>
      <PredefinedIcon icon={icon} />
    </Wrapper>
  );
}

PredefinedIconsPrivate.icons = Icon;
PredefinedIconsPrivate.variants = Variants;
