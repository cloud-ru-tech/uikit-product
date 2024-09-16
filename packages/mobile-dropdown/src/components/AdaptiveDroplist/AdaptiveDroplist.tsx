import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Droplist, DroplistProps } from '@snack-uikit/list';
import { extractSupportProps } from '@snack-uikit/utils';

import { MobileDroplist, MobileDroplistProps } from '../MobileDroplist';

export function AdaptiveDroplist({
  layoutType,
  open,
  onOpenChange,
  items,
  selection,
  children,
  ...rest
}: WithLayoutType<Omit<DroplistProps, 'children'> & Pick<MobileDroplistProps, 'children'>>) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? (
    <MobileDroplist
      open={open}
      onOpenChange={onOpenChange}
      items={items}
      selection={selection}
      {...extractSupportProps(rest)}
    >
      {children}
    </MobileDroplist>
  ) : (
    <Droplist open={open} onOpenChange={onOpenChange} items={items} selection={selection} {...rest}>
      {children}
    </Droplist>
  );
}

export type { DroplistProps };
