import { CardSuggest, CardSuggestProps } from '@cloud-ru/uikit-product-card-predefined';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Link, LinkProps } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type SolutionsWidgetProps = WithLayoutType<
  WithSupportProps<{
    moreLink?: Pick<LinkProps, 'onClick' | 'href'>;
    cards: Pick<CardSuggestProps, 'description' | 'title' | 'onClick'>[];
  }>
>;

export function SolutionsWidget({ layoutType, moreLink, cards, ...rest }: SolutionsWidgetProps) {
  const { t } = useLocale('Widget');
  const isMobile = layoutType === 'mobile';

  return (
    <div className={styles.wrapper} {...extractSupportProps(rest)}>
      <div className={styles.header}>
        <Typography.SansTitleL tag='h5'>{t('Solutions.title')}</Typography.SansTitleL>

        {moreLink && (
          <Link
            text={t('Solutions.link')}
            size='m'
            appearance='neutral'
            onClick={moreLink?.onClick}
            href={moreLink?.href}
          />
        )}
      </div>

      <div className={styles.cards} data-mobile={isMobile || undefined}>
        {cards.map(({ description, title, onClick }) => (
          <CardSuggest className={styles.card} key={title} description={description} title={title} onClick={onClick} />
        ))}
      </div>
    </div>
  );
}
