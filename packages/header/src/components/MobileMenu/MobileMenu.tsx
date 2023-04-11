import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type MobileMenuProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
}>;

export type MobileMenuReference = {
  toggleOpen(target: HTMLElement): void;
  close(): void;
};

export const MobileMenu = forwardRef<MobileMenuReference, MobileMenuProps>(({ children, className, ...rest }, ref) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    y,
    strategy,
    context,
    reference,
    floating: setFloating,
  } = useFloating({
    open: isMobileMenuOpen,
    onOpenChange: setIsMobileMenuOpen,
    placement: 'bottom',
  });
  const { getFloatingProps } = useInteractions([useClick(context), useDismiss(context)]);

  useImperativeHandle(ref, () => ({
    toggleOpen: (target: HTMLElement) => {
      reference(target);
      setIsMobileMenuOpen(!isMobileMenuOpen);
    },
    close: () => {
      setIsMobileMenuOpen(false);
    },
  }));

  if (!isMobileMenuOpen) return null;

  return (
    <FloatingPortal root={document.body}>
      <S.Wrapper
        className={className}
        top={y ?? 0}
        strategy={strategy}
        ref={setFloating}
        {...getFloatingProps()}
        {...extractSupportProps(rest)}
      >
        {children}
      </S.Wrapper>
    </FloatingPortal>
  );
});
