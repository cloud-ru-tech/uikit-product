import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Types } from '../../helpers';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { Wrapper, statusBadgeClassName } from './styled';

export type StatusProps = {
  type?: Types;
  className?: string;
  icon: React.ReactNode;
};

export function StatusIcon({ type = Types.Success, className, icon, ...rest }: WithSupportProps<StatusProps>) {
  return (
    <Wrapper className={className} {...extractSupportProps(rest)}>
      {icon}
      <StatusBadge type={type} className={statusBadgeClassName} />
    </Wrapper>
  );
}

StatusIcon.types = Types;
