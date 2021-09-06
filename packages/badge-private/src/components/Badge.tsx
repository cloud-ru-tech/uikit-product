import { ReactNode, useMemo } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Types } from './constants';
import { BadgeItemWrap, Dot, Badge as StyledBadge } from './styled';

export type BadgeProps = {
  type?: Types;
  number?: number;
  disabled?: boolean;
  className?: string;
  isGroupMessage?: boolean;
  children: ReactNode;
};

export const Badge = ({
  number,
  children,
  disabled,
  className,
  isGroupMessage,
  type = Types.Info,
  ...rest
}: WithSupportProps<BadgeProps>) => {
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
      <StyledBadge
        className={className}
        data-disabled={disabled || undefined}
        data-alert={type === Types.Alert || undefined}
        data-test-id={'badge__indicator'}
      >
        {badgeContent}
      </StyledBadge>
    </BadgeItemWrap>
  );
};

Badge.types = Types;
