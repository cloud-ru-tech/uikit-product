import { JSXElementConstructor, ReactNode } from 'react';

import styles from './styles.module.scss';

export type IconElement = JSXElementConstructor<{ size?: number; className?: string }>;

export type IconProps = {
  icon: ReactNode | IconElement;
  size: 'm' | 'l';
  'data-test-id'?: string;
};

const isElementConstructor = (icon: IconProps['icon']): icon is IconElement =>
  typeof icon === 'object' && icon !== null && 'render' in icon;

export function Icon({ icon: Icon, size, 'data-test-id': dataTestId }: IconProps) {
  const isIcon = isElementConstructor(Icon);

  if (isIcon) {
    return (
      <div className={styles.icon} data-size={size} data-test-id={dataTestId}>
        <Icon />
      </div>
    );
  }

  return Icon;
}
