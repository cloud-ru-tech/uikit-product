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
}>;

export type MobileMenuReference = {
  toggleOpen(target: HTMLElement): void;
};

export const MobileMenu = forwardRef<MobileMenuReference, MobileMenuProps>(({ children, ...rest }, ref) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    x,
    y,
    strategy,
    context,
    reference,
    floating: setFloating,
  } = useFloating({
    open: isMobileMenuOpen,
    onOpenChange: setIsMobileMenuOpen,
    placement: 'bottom-end',
  });
  const { getFloatingProps } = useInteractions([useClick(context), useDismiss(context)]);

  useImperativeHandle(ref, () => ({
    toggleOpen: (target: HTMLElement) => {
      reference(target);
      setIsMobileMenuOpen(!isMobileMenuOpen);
    },
  }));

  if (!isMobileMenuOpen) return null;

  return (
    <FloatingPortal root={document.body}>
      <S.Wrapper
        left={x ?? 0}
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
