import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Types } from '../../helpers';
import { StyledStatusBadge, Wrapper } from './styled';

export type StatusProps = {
  type?: Types;
  className?: string;
  icon: React.ReactNode;
};

export function StatusIcon({ type = Types.Success, className, icon, ...rest }: WithSupportProps<StatusProps>) {
  return (
    <Wrapper className={className} {...extractSupportProps(rest)}>
      {icon}
      <StyledStatusBadge type={type} />
    </Wrapper>
  );
}

StatusIcon.types = Types;
