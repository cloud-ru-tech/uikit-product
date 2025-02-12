import { extractSupportProps, WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';
import { CardLeadingItem } from './types';
import { getLabelTypographyProps, getValueTypographyProps } from './utils';

export type CardLeadingProps = WithLayoutType<CardLeadingItem>;

export function CardLeading({ layoutType, value, label, description, image, ...rest }: CardLeadingProps) {
  return (
    <div className={styles.cardLeading} {...extractSupportProps(rest)}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Typography family='sans' {...getValueTypographyProps(layoutType)} className={styles.cardLeadingColor}>
            {value}
          </Typography>
          <Typography family='sans' {...getLabelTypographyProps(layoutType)} className={styles.cardLeadingColor}>
            {label}
          </Typography>
        </div>
        <img className={styles.illustration} src={image} alt='illustration' />
        <div className={styles.footer} data-layout-type={layoutType}>
          <Typography.SansBodyL className={styles.cardLeadingColor}>{description}</Typography.SansBodyL>
        </div>
      </div>
    </div>
  );
}
