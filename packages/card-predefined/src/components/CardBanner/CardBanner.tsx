import { MouseEventHandler } from 'react';

import { ButtonTonal } from '@snack-uikit/button';
import { Card, CardProps } from '@snack-uikit/card';
import { ArrowRightSVG, CrossSVG } from '@snack-uikit/icons';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type CardBannerProps = WithSupportProps<
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

export function CardBanner({
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
}: CardBannerProps) {
  return (
    <Card
      // TODO: typescript error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {...extractSupportProps(rest)}
      href={href}
      className={className}
      onClick={onClick}
      disabled={disabled}
      functionBadge={
        onClose ? (
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
        ) : undefined
      }
    >
      <div className={styles.cardBannerContent}>
        <div className={styles.cardBannerLeft}>
          <Card.Header title={title} truncate={{ title: 2 }} />

          <Typography.SansBodyM>
            <TruncateString
              data-test-id='card-banner__description'
              maxLines={2}
              text={description}
              className={styles.cardBannerDescription}
            />
          </Typography.SansBodyM>

          <Card.Footer.CallToAction label={actionLabel} icon={<ArrowRightSVG />} />
        </div>

        <img src={image.src} alt={image.alt} className={styles.cardBannerImage} data-test-id='card-banner__image' />
      </div>
    </Card>
  );
}
