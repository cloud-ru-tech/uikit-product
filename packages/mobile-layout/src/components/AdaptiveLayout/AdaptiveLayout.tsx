import { CardBanner, CardBannerProps } from '@sbercloud/uikit-product-card-predefined';
import { BlockBasic, BlockBasicProps, EmptyBlock, EmptyBlockProps } from '@sbercloud/uikit-product-layout';
import { PageForm, PageFormProps } from '@sbercloud/uikit-product-page-layout';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { WithSupportProps } from '@snack-uikit/utils';

import { MobileBlockBasic } from '../MobileBlockBasic';
import { MobileCardBanner } from '../MobileCardBanner';
import { MobileEmptyBlock } from '../MobileEmptyBlock';
import { MobilePageForm } from '../MobilePageForm';
import { MobilePageServicesProps } from '../MobilePageServices';

export type ButtonVariant = NonNullable<NonNullable<MobilePageServicesProps['actions']>[0]['variant']>;

export type Action = Omit<NonNullable<MobilePageServicesProps['actions']>[0], 'variant'> & {
  variant: ButtonVariant;
};

export function AdaptiveBlockBasic({ layoutType, ...props }: WithSupportProps<WithLayoutType<BlockBasicProps>>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileBlockBasic {...props} /> : <BlockBasic {...props} />;
}

export function AdaptiveCardBanner({ layoutType, ...props }: WithSupportProps<WithLayoutType<CardBannerProps>>) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? <MobileCardBanner {...props} /> : <CardBanner {...props} />;
}

export function AdaptiveEmptyBlock({ layoutType, ...props }: WithSupportProps<WithLayoutType<EmptyBlockProps>>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileEmptyBlock {...props} /> : <EmptyBlock {...props} />;
}

export function AdaptivePageForm({ layoutType, ...props }: WithSupportProps<WithLayoutType<PageFormProps>>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobilePageForm {...props} /> : <PageForm {...props} />;
}

export type { BlockBasicProps, CardBannerProps, EmptyBlockProps, PageFormProps };
