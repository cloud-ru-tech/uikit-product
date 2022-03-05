import { useMemo } from 'react';

import { extractSupportProps } from '@sbercloud/uikit-utils';

import { Types } from './constants';
import { BadgeItemWrap, Dot, styledBadge } from './styled';
import { BadgeProps } from './types';

function StylelessBadge({
  number,
  children,
  disabled,
  className,
  isGroupMessage,
  type = Types.Info,
  ...rest
}: BadgeProps) {
  const badgeContent = useMemo(() => {
    if (isGroupMessage || !number) {
      return <Dot data-alert={type === Types.Alert || undefined} />;
    }

    if (number > 99) {
      return `99+`;
    }

    return number;
  }, [number, isGroupMessage, type]);

  return (
    <BadgeItemWrap {...extractSupportProps(rest)}>
      {children}
      <span
        className={className}
        data-disabled={disabled || undefined}
        data-alert={type === Types.Alert || undefined}
        data-test-id={'badge__indicator'}
      >
        {badgeContent}
      </span>
    </BadgeItemWrap>
  );
}

const StyledBadge = styledBadge(StylelessBadge);

export type { BadgeProps };

export const Badge = StyledBadge as typeof StyledBadge & {
  types: typeof Types;
};

Badge.types = Types;
