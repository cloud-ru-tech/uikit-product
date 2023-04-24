import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import cn from 'classnames';
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

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
      <div
        className={cn(styles.mobileMenu, className)}
        ref={setFloating}
        {...getFloatingProps({ style: { '--strategy': strategy, '--top': `${y ?? 0}px` } })}
        {...extractSupportProps(rest)}
      >
        {children}
      </div>
    </FloatingPortal>
  );
});
