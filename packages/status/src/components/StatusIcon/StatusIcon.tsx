import { ComponentType, SVGProps } from 'react';

import {
  CircleCancelFilledInterfaceSVG,
  CircleCheckFilledInterfaceSVG,
  LoadingWheelInterfaceSVG,
} from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Types, Variants } from './constants';
import { Wrapper } from './styled';

const iconByType: Record<Types, ComponentType<SVGProps<SVGSVGElement>>> = {
  [Types.Success]: CircleCheckFilledInterfaceSVG,
  [Types.Failed]: CircleCancelFilledInterfaceSVG,
  [Types.Cancel]: CircleCancelFilledInterfaceSVG,
  [Types.Loading]: LoadingWheelInterfaceSVG,
};

export type StatusIconProps = WithSupportProps<{
  type: Types;
  variant?: Variants;
  className?: string;
}>;

export function StatusIcon({ type, variant = Variants.Primary, className, ...rest }: StatusIconProps) {
  const Icon = iconByType[type];

  return (
    <Wrapper className={className} data-type={type} data-variant={variant} {...extractSupportProps(rest)}>
      <Icon />
    </Wrapper>
  );
}

StatusIcon.types = Types;
StatusIcon.variants = Variants;
