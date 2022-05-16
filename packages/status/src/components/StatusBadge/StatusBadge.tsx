import { ReactNode } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Types } from '../../helpers';
import { StyledStatusBadge, Wrapper } from './styled';

export type StatusBadgeProps = {
  type?: Types;
  className?: string;
  icon: ReactNode;
};

export function StatusBadge({ type = Types.Success, className, icon, ...rest }: WithSupportProps<StatusBadgeProps>) {
  return (
    <Wrapper className={className} {...extractSupportProps(rest)}>
      {icon}
      <StyledStatusBadge type={type} />
    </Wrapper>
  );
}

StatusBadge.types = Types;
