import { MouseEventHandler } from 'react';

import { ArrowRightSVG, CrossSVG } from '@sbercloud/uikit-product-icons';
import { ButtonTonal } from '@snack-uikit/button';
import { Card, CardProps } from '@snack-uikit/card';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type MobileCardBannerProps = WithSupportProps<
  Pick<CardProps, 'onClick' | 'className' | 'disabled' | 'href'> & {
    title: string;
    description: string;
    actionLabel: string;
    image: {
      src: string;
      alt: string;
    };
    onClose?: MouseEventHandler<HTMLElement>;
  }
>;

export function MobileCardBanner({
  href,
  title,
  description,
  onClick,
  actionLabel,
  image,
  className,
  onClose,
  disabled,
  ...rest
}: MobileCardBannerProps) {
  return (
    <Card {...extractSupportProps(rest)} href={href} className={className} onClick={onClick} disabled={disabled}>
      <>
        {onClose && (
          <div className={styles.cardFunctionBadgeWrapper}>
            <ButtonTonal
              icon={<CrossSVG />}
              appearance='neutral'
              onClick={e => {
                e.stopPropagation();
                onClose(e);
              }}
              size='xs'
            />
          </div>
        )}

        <div className={styles.cardBannerContent}>
          <div className={styles.cardBannerLeft}>
            <div className={styles.cardBannerTitle}>{title}</div>

            <Typography.SansBodyM>
              <div data-test-id='card-banner__description' className={styles.cardBannerDescription}>
                {description}
              </div>
            </Typography.SansBodyM>

            <Card.Footer.CallToAction
              className={styles.cardBannerFooter}
              label={actionLabel}
              icon={<ArrowRightSVG />}
            />
          </div>

          <img src={image.src} alt={image.alt} className={styles.cardBannerImage} data-test-id='card-banner__image' />
        </div>
      </>
    </Card>
  );
}
