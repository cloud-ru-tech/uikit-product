import { extractSupportProps } from '@sbercloud/uikit-utils';

import { Sizes, Types } from '../../helpers';
import { styledStatusBadge } from './styled';
import { StatusBadgeProps } from './types';

function StylelessStatusBadge({ type, size = Sizes.Small, className, ...rest }: StatusBadgeProps) {
  return <span data-type={type} data-size={size} className={className} {...extractSupportProps(rest)} />;
}

const StyledStatusBadge = styledStatusBadge(StylelessStatusBadge);

export type { StatusBadgeProps };

export const StatusBadge = StyledStatusBadge as typeof StyledStatusBadge & {
  sizes: typeof Sizes;
  types: typeof Types;
};

StatusBadge.types = Types;
StatusBadge.sizes = Sizes;
