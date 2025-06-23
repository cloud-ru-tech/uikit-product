import cn from 'classnames';

import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type LinkItemHeaderProps = {
  href?: string;
  target?: string;
  label: string;
  withoutHover?: boolean;
  active?: boolean;
  onClick?: () => void;
};

export function LinkItemHeader({ href, label, onClick, withoutHover, target, active }: LinkItemHeaderProps) {
  if (href) {
    return (
      <a href={href} target={target} onClick={onClick} className={styles.item}>
        <Typography.SansTitleS>{label}</Typography.SansTitleS>
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(styles.item, styles.button, {
        [styles.active]: active,
        [styles.hovered]: !withoutHover && !active,
      })}
    >
      <Typography.SansTitleS>{label}</Typography.SansTitleS>
    </button>
  );
}
