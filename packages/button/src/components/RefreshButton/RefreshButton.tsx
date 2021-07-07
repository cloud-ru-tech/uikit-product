import { RefreshInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useCallback, useMemo } from 'react';

import { ButtonVariant } from '../../helpers/constants';
import { Button } from '../Default';
import { refreshAnimation } from './styled';

export type RefreshButtonProps = {
  onRefresh?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
};

export const RefreshButton = ({
  onRefresh,
  disabled = false,
  variant = Button.variants.TableMenu,
  className = '',
}: RefreshButtonProps) => {
  const onRefreshCallback = useCallback(() => onRefresh?.(), [onRefresh]);
  const animationDecorator = useMemo(() => (!disabled ? refreshAnimation : undefined), [disabled]);

  return onRefresh ? (
    <Button
      className={className}
      variant={variant}
      size={Button.sizes.xs}
      disabled={disabled}
      onClick={onRefreshCallback}
    >
      <RefreshInterfaceSVG className={animationDecorator} />
    </Button>
  ) : null;
};

RefreshButton.variants = ButtonVariant;
