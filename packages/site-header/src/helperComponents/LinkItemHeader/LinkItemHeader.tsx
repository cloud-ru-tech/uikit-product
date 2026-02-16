import cn from 'classnames';

import { Typography } from '@snack-uikit/typography';

import { Icon, IconProps } from '../Icon';
import styles from './styles.module.scss';

type LinkItemHeaderProps = {
  href?: string;
  target?: string;
  label: string;
  withoutHover?: boolean;
  active?: boolean;
  onClick?: () => void;
  icon?: IconProps['icon'] | null;
};

export function LinkItemHeader({ href, label, onClick, withoutHover, target, active, icon }: LinkItemHeaderProps) {
  if (href) {
    return (
      <a href={href} target={target} onClick={onClick} className={styles.item}>
        <Typography.SansTitleS>{label}</Typography.SansTitleS>
        {icon && <Icon icon={icon} size='s' />}
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
      {icon && <Icon icon={icon} size='s' />}
    </button>
  );
}
