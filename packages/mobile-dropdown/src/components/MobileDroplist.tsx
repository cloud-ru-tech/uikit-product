import { cloneElement, isValidElement, useMemo, useRef } from 'react';

import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { kindFlattenItems, List, ListProps } from '@snack-uikit/list';
import { useValueControl } from '@snack-uikit/utils';

import { MobileDropdownProps } from './MobileDropdown';
import styles from './styles.module.scss';

export type MobileDroplistProps = Omit<MobileDropdownProps, 'content'> & ListProps & { label?: string };

export function MobileDroplist({
  items,
  selection,
  open: openProp,
  onOpenChange,
  children,
  search,
  label,
  footer,
  ...rest
}: MobileDroplistProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [open = false, setIsOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });
  const flattenItems = useMemo(() => {
    const { flattenItems } = kindFlattenItems({ items });

    return flattenItems;
  }, [items]);

  const searchable = search && Object.values(flattenItems).length > 5;

  const listJsx = (
    <div className={styles.listWrapper}>
      <List
        items={items}
        selection={selection}
        size='l'
        search={searchable ? search : undefined}
        scrollRef={searchable ? scrollRef : undefined}
        {...rest}
      />
    </div>
  );

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

      <MobileModalCustom open={open} onClose={handleClose} size={searchable ? 'full' : 'auto'} scrollRef={scrollRef}>
        {label && <MobileModalCustom.Header title={label} />}

        {searchable ? (
          listJsx
        ) : (
          <MobileModalCustom.Body className={styles.bodyNoPadding} content={listJsx} scrollRef={scrollRef} />
        )}

        {footer && <MobileModalCustom.Footer actions={footer} />}
      </MobileModalCustom>
    </>
  );
}
