import { JSXElementConstructor, ReactNode } from 'react';

import styles from './styles.module.scss';

export type IconElement = JSXElementConstructor<{ size?: number; className?: string }>;

export type IconProps = {
  icon: ReactNode | IconElement;
  size: 'm' | 'l';
  'data-test-id'?: string;
  decor?: boolean;
};

const isElementConstructor = (icon: IconProps['icon']): icon is IconElement =>
  typeof icon === 'object' && icon !== null && 'render' in icon;

export function Icon({ icon: Icon, size = 'm', 'data-test-id': dataTestId, decor }: IconProps) {
  const isIcon = isElementConstructor(Icon);

  if (isIcon) {
    return (
      <div className={styles.icon} data-size={size} data-test-id={dataTestId} data-decor={decor || undefined}>
        <Icon />
      </div>
    );
  }

  return Icon;
}
