import cn from 'classnames';
import { ReactNode, useRef } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';
import { MainMenuInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type MobileHeaderProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
  onMenuClick?(target: HTMLElement): void;
}>;

export function MobileHeader({ children, className, onMenuClick, ...rest }: MobileHeaderProps) {
  const headerRef = useRef(null);

  return (
    <div ref={headerRef}>
      <header
        style={{
          backgroundColor: `var(${GLOBAL_CSS_COLOR.NAVIGATION_BACKGROUND})`,
        }}
        className={cn(styles.mobileWrapper, className)}
        {...extractSupportProps(rest)}
      >
        {children}
        {onMenuClick && (
          <ButtonIcon
            className={styles.mobileMenuTrigger}
            icon={<MainMenuInterfaceSVG size={24} />}
            variant={ButtonIcon.variants.Weak}
            onClick={() => headerRef.current && onMenuClick(headerRef.current)}
          />
        )}
      </header>

      <Divider />
    </div>
  );
}
