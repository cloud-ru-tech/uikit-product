import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Types } from '../../helpers';
import { Dot } from './styled';

export type StatusBadgeProps = {
  type: Types;
  className?: string;
};

export function StatusBadge({ type, className, ...rest }: WithSupportProps<StatusBadgeProps>) {
  return <Dot data-type={type} className={className} {...extractSupportProps(rest)} />;
}

StatusBadge.types = Types;
