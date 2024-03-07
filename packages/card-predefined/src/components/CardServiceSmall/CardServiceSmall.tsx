import { Card, CardProps } from '@snack-uikit/card';
import { PromoTag } from '@snack-uikit/promo-tag';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type CardServiceSmallProps = WithSupportProps<
  Pick<CardProps, 'promoBadge' | 'onClick' | 'className' | 'disabled' | 'outline'> &
    Required<Pick<Card.HeaderProps, 'title' | 'emblem'>> & {
      truncate?: Pick<NonNullable<Card.HeaderProps['truncate']>, 'title'>;
    }
>;

export function CardServiceSmall({
  promoBadge,
  title,
  emblem,
  onClick,
  className,
  disabled,
  truncate,
  outline,
  ...rest
}: CardServiceSmallProps) {
  return (
    <div className={styles.wrapper}>
      <Card
        // TODO: typescript error
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {...extractSupportProps(rest)}
        className={className}
        header={<Card.Header title={title} emblem={emblem} truncate={truncate} />}
        onClick={onClick}
        disabled={disabled}
        outline={outline}
        size='s'
      />
      {promoBadge && (
        <div className={styles.promoTagWrapper}>
          <PromoTag
            {...(typeof promoBadge === 'string' ? { text: promoBadge } : promoBadge)}
            data-test-id='card__promo-badge'
          />
        </div>
      )}
    </div>
  );
}
