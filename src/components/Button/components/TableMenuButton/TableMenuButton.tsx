import clsx from 'clsx';

import { Button, IButtonProps } from 'components/Button';

import { tableMenuButtonClassName } from './styled';

export interface ITableMenuButtonProps {
  disabled?: boolean;
  className?: string;
  size?: IButtonProps['size'];
}

export const TableMenuButton: React.FC<ITableMenuButtonProps> = ({
  disabled,
  children,
  className,
  size,
}) => (
  <Button
    disabled={disabled}
    variant='transparent'
    size={size || 's'}
    className={clsx(className, tableMenuButtonClassName)}
  >
    {children}
  </Button>
);
