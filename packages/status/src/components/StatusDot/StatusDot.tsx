import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Sizes, Types } from '../../helpers';
import { styledStatusDot } from './styled';
import { StatusDotProps } from './types';

function StylelessStatusDot({ type, size = Sizes.Small, className, ...rest }: StatusDotProps) {
  return <span data-type={type} data-size={size} className={className} {...extractSupportProps(rest)} />;
}

const StyledStatusDot = styledStatusDot(StylelessStatusDot);

export type { StatusDotProps };

export const StatusDot = StyledStatusDot as typeof StyledStatusDot & {
  sizes: typeof Sizes;
  types: typeof Types;
};

StatusDot.types = Types;
StatusDot.sizes = Sizes;
