import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Droplist, DroplistProps } from '@snack-uikit/list';

import { MobileDroplist, MobileDroplistProps } from '../MobileDroplist';

export type AdaptiveDroplistProps = WithLayoutType<
  Omit<DroplistProps, 'children'> & Pick<MobileDroplistProps, 'children'>
>;

export function AdaptiveDroplist({ layoutType, children, size, ...dropListProps }: AdaptiveDroplistProps) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? (
    <MobileDroplist {...dropListProps}>{children}</MobileDroplist>
  ) : (
    <Droplist {...dropListProps} size={size}>
      {children}
    </Droplist>
  );
}

export type { DroplistProps };
