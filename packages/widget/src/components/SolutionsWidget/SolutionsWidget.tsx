import { CardSuggest, CardSuggestProps } from '@sbercloud/uikit-product-card-predefined';
import { extractSupportProps, useLanguage, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Link, LinkProps } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../helpers';
import styles from './styles.module.scss';

export type SolutionsWidgetProps = WithLayoutType<
  WithSupportProps<{
    moreLink?: Pick<LinkProps, 'onClick' | 'href'>;
    cards: Pick<CardSuggestProps, 'description' | 'title' | 'onClick'>[];
  }>
>;

export function SolutionsWidget({ layoutType, moreLink, cards, ...rest }: SolutionsWidgetProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const isMobile = layoutType === 'mobile';

  return (
    <div className={styles.wrapper} {...extractSupportProps(rest)}>
      <div className={styles.header}>
        <Typography.SansTitleL tag='h5'>{textProvider(languageCode, Texts.SolutionsWidgetTitle)}</Typography.SansTitleL>

        {moreLink && (
          <Link
            text={textProvider(languageCode, Texts.SolutionsWidgetLink)}
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
