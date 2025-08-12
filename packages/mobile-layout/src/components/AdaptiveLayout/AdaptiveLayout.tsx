import { CardBanner, CardBannerProps } from '@sbercloud/uikit-product-card-predefined';
import { BlockBasic, BlockBasicProps, EmptyBlock, EmptyBlockProps } from '@sbercloud/uikit-product-layout';
import { PageForm, PageFormProps, PageServices, PageServicesProps } from '@sbercloud/uikit-product-page-layout';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { DesktopActions } from '../../helperComponents';
import { MobileBlockBasic } from '../MobileBlockBasic';
import { MobileCardBanner } from '../MobileCardBanner';
import { MobileEmptyBlock } from '../MobileEmptyBlock';
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

export type { BlockBasicProps, CardBannerProps, EmptyBlockProps, PageFormProps, PageServicesProps };
