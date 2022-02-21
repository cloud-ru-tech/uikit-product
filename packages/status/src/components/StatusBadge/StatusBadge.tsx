import { extractSupportProps } from '@sbercloud/uikit-utils';

import { Types } from '../../helpers';
import { styledStatusBadge } from './styled';
import { StatusBadgeProps } from './types';

function StylelessStatusBadge({ type, className, ...rest }: StatusBadgeProps) {
  return <span data-type={type} className={className} {...extractSupportProps(rest)} />;
}

const StyledStatusBadge = styledStatusBadge(StylelessStatusBadge);

export type { StatusBadgeProps };

export const StatusBadge = StyledStatusBadge as typeof StyledStatusBadge & {
  types: typeof Types;
};

StatusBadge.types = Types;
