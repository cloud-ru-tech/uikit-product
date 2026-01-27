import { CardInfo, CardInfoProps } from '@cloud-ru/uikit-product-site-cards';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type CardNumericProps = Omit<CardInfoProps, 'icon'> & {
  number: number;
};

export function CardNumeric({ number, ...props }: CardNumericProps) {
  return (
    <CardInfo
      {...props}
      icon={<Typography.SansHeadlineM className={styles.number}>{number}</Typography.SansHeadlineM>}
    />
  );
}
