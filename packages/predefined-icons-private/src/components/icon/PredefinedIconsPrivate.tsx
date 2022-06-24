import { ComponentType, SVGProps } from 'react';

import {
  AttentionInterfaceSVG,
  CircleCancelFilledInterfaceSVG,
  CircleCheckFilledInterfaceSVG,
  InfoInterfaceSVG,
  LoadingWheelInterfaceSVG,
} from '@sbercloud/uikit-product-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Icons, Variants } from './constants';
import { Wrapper } from './styled';

const iconByName: Record<Icons, ComponentType<SVGProps<SVGSVGElement>>> = {
  [Icons.Info]: InfoInterfaceSVG,
  [Icons.Success]: CircleCheckFilledInterfaceSVG,
  [Icons.AttentionCritical]: AttentionInterfaceSVG,
  [Icons.AttentionWarning]: AttentionInterfaceSVG,
  [Icons.Failed]: CircleCancelFilledInterfaceSVG,
  [Icons.Cancel]: CircleCancelFilledInterfaceSVG,
  [Icons.Loading]: LoadingWheelInterfaceSVG,
};

export type PredefinedIconsPrivateProps = WithSupportProps<{
  icon: Icons;
  variant?: Variants;
  className?: string;
}>;

export function PredefinedIconsPrivate({
  icon,
  variant = Variants.Primary,
  className,
  ...rest
}: PredefinedIconsPrivateProps) {
  const Icon = iconByName[icon];

  return (
    <Wrapper className={className} data-icon={icon} data-variant={variant} {...extractSupportProps(rest)}>
      <Icon />
    </Wrapper>
  );
}

PredefinedIconsPrivate.icons = Icons;
PredefinedIconsPrivate.variants = Variants;
