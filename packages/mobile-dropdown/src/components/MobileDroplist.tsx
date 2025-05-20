import { cloneElement, isValidElement, useMemo, useRef } from 'react';

import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { DroplistProps, List, ListProps } from '@snack-uikit/list';
import { useValueControl } from '@snack-uikit/utils';

import { MobileDropdownProps } from './MobileDropdown';
import styles from './styles.module.scss';

export type MobileDroplistProps = Omit<MobileDropdownProps, 'content'> &
  Pick<DroplistProps, 'closeDroplistOnItemClick'> &
  ListProps & {
    label?: string;
    virtualized?: boolean;
  };

export function MobileDroplist({
  items,
  selection,
  open: openProp,
  onOpenChange,
  children,
  search,
  label,
  footer,
  virtualized,
  closeDroplistOnItemClick,
  ...rest
}: MobileDroplistProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [open = false, setIsOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });

  const searchable = search;

  const needCloseOnSelectItem = selection?.mode !== 'multiple' && closeDroplistOnItemClick;

  const handleClose = () => setIsOpen(false);

  const handleSelectItem: NonNullable<typeof selection>['onChange'] = selectedItem => {
    if (needCloseOnSelectItem) {
      handleClose();
    }

    selection?.onChange?.(selectedItem);
  };

  const listJsx = (
    <div className={styles.listWrapper} data-virtualized={virtualized || undefined}>
      <List
        items={items}
        selection={selection && { ...selection, onChange: handleSelectItem }}
        size='l'
        search={searchable ? search : undefined}
        scrollRef={searchable || virtualized ? scrollRef : undefined}
        scroll={virtualized}
        virtualized={virtualized}
        {...rest}
      />
    </div>
  );

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

      <MobileModalCustom open={open} onClose={handleClose} size={searchable || virtualized ? 'full' : 'auto'}>
        {label && <MobileModalCustom.Header title={label} />}

        {searchable ? listJsx : <MobileModalCustom.Body className={styles.bodyNoPadding} content={listJsx} />}

        {footer && <MobileModalCustom.Footer actions={footer} />}
      </MobileModalCustom>
    </>
  );
}
