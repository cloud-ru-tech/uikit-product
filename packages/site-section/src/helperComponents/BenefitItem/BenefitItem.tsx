import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';
import { getValueTypographyProps } from './utils';

export type BenefitItemProps = WithLayoutType<{
  value: string;
  description: string;
}>;

export function BenefitItem({ value, description, layoutType }: BenefitItemProps) {
  return (
    <div className={styles.benefitItem} data-layout-type={layoutType}>
      <Typography family='sans' tag='div' {...getValueTypographyProps(layoutType)}>
        <RichText richText={value} />
      </Typography>
      <Typography family='sans' tag='div' purpose='title' size='m'>
        <RichText richText={description} />
      </Typography>
    </div>
  );
}
