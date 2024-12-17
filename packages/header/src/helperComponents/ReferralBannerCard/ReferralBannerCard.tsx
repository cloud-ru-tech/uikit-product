import cn from 'classnames';

import { Card, CardProps } from '@snack-uikit/card';
import { PromoTag } from '@snack-uikit/promo-tag';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type ReferralBannerCardProps = Pick<CardProps, 'onClick'> & {
  promoBadge: string;
  title: string;
  text?: string;
  isMobile?: boolean;
};

export function ReferralBannerCard(props: ReferralBannerCardProps) {
  return (
    <div className={cn(!props.isMobile && styles.cardWrapper)}>
      <Card
        size={'m'}
        className={styles.card}
        onClick={props.onClick}
        {...(!props.isMobile && { promoBadge: props.promoBadge })}
      >
        <div className={cn(styles.wrapper, props.isMobile && styles.mobile)}>
          <div className={styles.left}>
            <Typography.SansTitleS className={styles.title}>
              {props.title}
              {props.isMobile && <PromoTag text={props.promoBadge as string} />}
            </Typography.SansTitleS>

            {props.text && <Typography.SansBodyS className={styles.text}>{props.text}</Typography.SansBodyS>}
          </div>
        </div>
      </Card>
    </div>
  );
}
