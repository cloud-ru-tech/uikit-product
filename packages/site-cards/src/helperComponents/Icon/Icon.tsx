import { JSXElementConstructor, ReactNode } from 'react';

import styles from './styles.module.scss';

export type IconElement = JSXElementConstructor<{ size?: number; className?: string }>;

export type IconProps = {
  icon: ReactNode | IconElement | { src: string; alt?: string };
  size: 'm' | 'l';
  'data-test-id'?: string;
  decor?: boolean;
};

const isElementConstructor = (icon: IconProps['icon']): icon is IconElement =>
  typeof icon === 'object' && icon !== null && 'render' in icon;

export function Icon({ icon: Icon, size = 'm', 'data-test-id': dataTestId, decor }: IconProps) {
  const isIcon = isElementConstructor(Icon);
  const isImg = !isIcon && typeof Icon === 'object' && Icon !== null && 'src' in Icon;

  if (isIcon || isImg) {
    return (
      <div className={styles.icon} data-size={size} data-test-id={dataTestId} data-decor={decor || undefined}>
        {isIcon && <Icon />}
        {isImg && <img src={Icon.src} alt={Icon.alt} />}
      </div>
    );
  }

  return Icon as ReactNode;
}
