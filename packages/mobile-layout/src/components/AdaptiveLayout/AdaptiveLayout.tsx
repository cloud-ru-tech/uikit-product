import { CardBanner, CardBannerProps } from '@cloud-ru/uikit-product-card-predefined';
import { BlockBasic, BlockBasicProps, EmptyBlock, EmptyBlockProps } from '@cloud-ru/uikit-product-layout';
import {
  PageCatalog,
  PageCatalogProps,
  PageForm,
  PageFormProps,
  PageServices,
  PageServicesProps,
} from '@cloud-ru/uikit-product-page-layout';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { DesktopActions } from '../../helperComponents';
import { MobileBlockBasic } from '../MobileBlockBasic';
import { MobileCardBanner } from '../MobileCardBanner';
import { MobileEmptyBlock } from '../MobileEmptyBlock';
import { MobilePageCatalog, MobilePageCatalogProps } from '../MobilePageCatalog';
import { MobilePageForm } from '../MobilePageForm';
import { MobilePageServices, MobilePageServicesProps } from '../MobilePageServices';

export type ButtonVariant = NonNullable<NonNullable<MobilePageServicesProps['actions']>[0]['variant']>;

export type Action = Omit<NonNullable<MobilePageServicesProps['actions']>[0], 'variant'> & {
  variant: ButtonVariant;
};

export type AdaptiveBlockBasicProps = WithLayoutType<BlockBasicProps>;

export function AdaptiveBlockBasic({ layoutType, ...props }: AdaptiveBlockBasicProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileBlockBasic {...props} /> : <BlockBasic {...props} />;
}

export type AdaptiveCardBannerProps = WithLayoutType<CardBannerProps>;

export function AdaptiveCardBanner({ layoutType, ...props }: AdaptiveCardBannerProps) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? <MobileCardBanner {...props} /> : <CardBanner {...props} />;
}

export type AdaptiveEmptyBlockProps = WithLayoutType<EmptyBlockProps>;

export function AdaptiveEmptyBlock({ layoutType, ...props }: AdaptiveEmptyBlockProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileEmptyBlock {...props} /> : <EmptyBlock {...props} />;
}

export type AdaptivePageFormProps = WithLayoutType<PageFormProps>;

export function AdaptivePageForm({ layoutType, ...props }: AdaptivePageFormProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobilePageForm {...props} /> : <PageForm {...props} />;
}

export type AdaptivePageServicesProps = WithLayoutType &
  Omit<PageServicesProps, 'actions'> &
  Pick<MobilePageServicesProps, 'actions'>;

export function AdaptivePageServices({ layoutType, actions, ...props }: AdaptivePageServicesProps) {
  const isMobile = layoutType === 'mobile';

  if (isMobile) {
    return <MobilePageServices actions={actions} {...props} />;
  }

  const actionsNode = actions ? <DesktopActions items={actions} /> : undefined;

  return <PageServices {...props} actions={actionsNode} />;
}

export type AdaptivePageCatalogProps = WithLayoutType &
  Omit<PageCatalogProps, 'actions'> &
  Pick<MobilePageCatalogProps, 'actions'>;

export function AdaptivePageCatalog({ layoutType, actions, ...props }: AdaptivePageCatalogProps) {
  const isMobile = layoutType === 'mobile';

  if (isMobile) {
    return <MobilePageCatalog actions={actions} {...props} />;
  }

  const actionsNode = actions ? <DesktopActions items={actions} /> : undefined;

  return <PageCatalog {...props} actions={actionsNode} />;
}

export type { BlockBasicProps, CardBannerProps, EmptyBlockProps, PageFormProps, PageServicesProps, PageCatalogProps };
