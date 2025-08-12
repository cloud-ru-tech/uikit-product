import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Drawer, DrawerCustom, DrawerProps } from '@snack-uikit/drawer';

import { SIZE } from '../../constants';
import { Size } from '../../types';
import { MobileModal, MobileModalProps } from '../MobileModal';
import { MobileModalCustom } from '../MobileModalCustom';

export type AdaptiveDrawerProps = WithLayoutType<
  Omit<DrawerProps, 'size'> & {
    size?: DrawerProps['size'] | MobileModalProps['size'];
  }
>;

export function AdaptiveDrawer({ layoutType, size, ...props }: AdaptiveDrawerProps) {
  const isMobile = layoutType === 'mobile';
  const mobileSize = size && Object.values<string>(SIZE).includes(size) ? (size as Size) : undefined;
  const desktopProps = {
    ...props,
    size: size && ['s', 'm', 'l'].includes(size) ? size : undefined,
  } as DrawerProps;

  return isMobile ? (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <MobileModal size={mobileSize} {...props} />
  ) : (
    <Drawer {...desktopProps} />
  );
}

export function useAdaptiveDrawerCustom({ layoutType }: WithLayoutType) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? MobileModalCustom : DrawerCustom;
}

export type { DrawerProps };
