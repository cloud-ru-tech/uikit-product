import { ReactNode, useRef } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';
import { MainMenuInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type MobileHeaderProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
  onMenuClick?(target: HTMLElement): void;
}>;

export function MobileHeader({ children, className, onMenuClick, ...rest }: MobileHeaderProps) {
  const headerRef = useRef(null);

  return (
    <div ref={headerRef}>
      <S.MobileWrapper className={className} {...extractSupportProps(rest)}>
        {children}
        {onMenuClick && (
          <S.MobileMenuTrigger
            icon={<MainMenuInterfaceSVG size={24} />}
            variant={ButtonIcon.variants.Weak}
            onClick={() => headerRef.current && onMenuClick(headerRef.current)}
          />
        )}
      </S.MobileWrapper>

      <Divider />
    </div>
  );
}
