import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Droplist, DroplistProps } from '@snack-uikit/list';
import { extractSupportProps } from '@snack-uikit/utils';

import { MobileDroplist, MobileDroplistProps } from '../MobileDroplist';

export function AdaptiveDroplist({
  layoutType,
  children,
  ...rest
}: WithLayoutType<Omit<DroplistProps, 'children'> & Pick<MobileDroplistProps, 'children'>>) {
  const isMobile = layoutType === 'mobile';
  const dropListProps = { ...rest, ...extractSupportProps(rest) };

  return isMobile ? (
    <MobileDroplist {...dropListProps}>{children}</MobileDroplist>
  ) : (
    <Droplist {...dropListProps}>{children}</Droplist>
  );
}

export type { DroplistProps };
