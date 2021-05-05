import { useCallback, useMemo } from 'react';
import { Button } from 'components/Button';
import { RefreshSVG } from '@sbercloud/icons';
import { refreshAnimation } from 'components/Button/components/RefreshButton/styled';
import { TButtonVariant } from 'components/Button/helpers/types';
import { ButtonVariant } from 'components/Button/helpers/constants';

export interface IRefreshButtonProps {
  onRefresh?: () => void;
  variant?: TButtonVariant;
  disabled?: boolean;
  className?: string;
}

export const RefreshButton = ({
  onRefresh,
  disabled = false,
  variant = Button.variants.tableMenu,
  className = '',
}: IRefreshButtonProps) => {
  const onRefreshCallback = useCallback(() => onRefresh?.(), [onRefresh]);
  const animationDecorator = useMemo(
    () => (!disabled ? refreshAnimation : undefined),
    [disabled],
  );

  return onRefresh ? (
    <Button
      className={className}
      variant={variant}
      size={Button.sizes.xs}
      disabled={disabled}
      onClick={onRefreshCallback}
    >
      <RefreshSVG className={animationDecorator} />
    </Button>
  ) : null;
};

RefreshButton.variants = ButtonVariant;
