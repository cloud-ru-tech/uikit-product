import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';
import { getValueTypographyProps, getValueTypographySubtitleProps } from './utils';

export type BenefitItemProps = WithLayoutType<{
  title: string;
  subtitle: string;
  description: string;
  paddingLeftItem?: number;
}>;

export function BenefitItem({ title, subtitle, description, paddingLeftItem, layoutType }: BenefitItemProps) {
  const paddingItem =
    (layoutType === 'desktop' || layoutType === 'desktopSmall') && paddingLeftItem ? paddingLeftItem : 0;

  return (
    <div className={styles.benefitItem} style={{ paddingLeft: `${paddingItem}px` }} data-layout-type={layoutType}>
      <div className={styles.benefitsTitles}>
        <Typography family='sans' tag='div' {...getValueTypographyProps(layoutType)}>
          <RichText richText={title} />
        </Typography>
        <Typography family='sans' tag='div' {...getValueTypographySubtitleProps(layoutType)}>
          <RichText richText={subtitle} className={styles.subtitleText} data-layout-type={layoutType} />
        </Typography>
      </div>
      <Typography family='sans' tag='div' purpose='body' size='m'>
        <RichText richText={description} />
      </Typography>
    </div>
  );
}
