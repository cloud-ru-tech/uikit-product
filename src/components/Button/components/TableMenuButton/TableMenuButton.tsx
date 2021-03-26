import clsx from 'clsx';

import { Button } from 'components/Button';

import { tableMenuButtonClassName } from './styled';

export interface ITableMenuButtonProps {
  disabled?: boolean;
  className?: string;
}

export const TableMenuButton: React.FC<ITableMenuButtonProps> = ({
  disabled,
  children,
  className,
}) => (
  <Button
    disabled={disabled}
    variant='transparent'
    className={clsx(className, tableMenuButtonClassName)}
  >
    {children}
  </Button>
);
