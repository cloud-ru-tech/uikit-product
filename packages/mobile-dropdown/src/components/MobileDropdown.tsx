import { cloneElement, isValidElement, MouseEvent, PropsWithChildren, ReactNode, useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { MobileModalCustom, MobileModalCustomProps } from '@sbercloud/uikit-product-mobile-modal';
import { WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type MobileDropdownProps = PropsWithChildren<
  WithSupportProps<
    {
      open?: boolean;
      onOpenChange?(value: boolean): void;
      content: ReactNode;
      closeOnPopstate?: boolean;
    } & Pick<MobileModalCustomProps, 'size'>
  >
>;

export function MobileDropdown({ open, onOpenChange, children, content, ...rest }: MobileDropdownProps) {
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);

  const handleClose = () => setIsOpen(false);

  const trigger = useMemo(() => {
    const handleOpen = () => setIsOpen(true);

    if (isValidElement(children)) {
      return cloneElement(children, {
        // todo: check if there is onClick
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onClick: (event: MouseEvent<HTMLElement>) => {
          children.props.onClick?.(event);
          handleOpen();
        },
      });
    }

    return (
      <span role='button' tabIndex={0} onClick={handleOpen}>
        {children}
      </span>
    );
  }, [children, setIsOpen]);

  return (
    <>
      {trigger}

      <MobileModalCustom open={isOpen} onClose={handleClose} className={styles.modal} {...rest}>
        {content}
      </MobileModalCustom>
    </>
  );
}
