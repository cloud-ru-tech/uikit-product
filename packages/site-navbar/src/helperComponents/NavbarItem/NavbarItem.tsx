import { KeyboardEvent, ReactElement, useCallback } from 'react';

import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type NavbarItemProps = {
  id: string;
  text: string;
  icon?: ReactElement;
  disabled?: boolean;
};

const KEYS = ['Space', 'Enter'];

type Props = NavbarItemProps & {
  active?: boolean;
  onClick(id: string): void;
};

export function NavbarItem({ id, text, icon, onClick, active = false, disabled = false }: Props) {
  const handleClick = useCallback(() => {
    onClick(id);
  }, [id, onClick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (KEYS.includes(e.code)) {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <div
      className={styles.navbarItem}
      data-active={active || undefined}
      data-disabled={disabled || undefined}
      onClick={disabled ? undefined : handleClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
      tabIndex={disabled ? undefined : 0}
    >
      <div className={styles.background} data-active={active || undefined} data-disabled={disabled || undefined} />
      <Typography
        family='sans'
        purpose='body'
        size='m'
        tag='div'
        className={styles.text}
        data-disabled={disabled || undefined}
      >
        {text}
      </Typography>
      {icon && (
        <div className={styles.iconWrapper} data-disabled={disabled || undefined}>
          {icon}
        </div>
      )}
    </div>
  );
}
