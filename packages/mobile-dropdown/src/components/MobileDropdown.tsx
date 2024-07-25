import { cloneElement, isValidElement, MouseEvent, PropsWithChildren, useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { List, ListProps } from '@snack-uikit/list';
import { WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type MobileDropdownProps = PropsWithChildren<
  Pick<ListProps, 'items' | 'selection'> &
    WithSupportProps<{
      open?: boolean;
      onOpenChange?(value: boolean): void;
    }>
>;

export function MobileDropdown({ open, onOpenChange, items, selection, children, ...rest }: MobileDropdownProps) {
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
        <List items={items} selection={selection} size='l' />
      </MobileModalCustom>
    </>
  );
}
