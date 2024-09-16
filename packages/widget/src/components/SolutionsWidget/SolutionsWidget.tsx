import { CardSuggest, CardSuggestProps } from '@sbercloud/uikit-product-card-predefined';
import { extractSupportProps, useLanguage, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Link, LinkProps } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../helpers';
import * as S from './styled';

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
    <S.Wrapper {...extractSupportProps(rest)}>
      <S.Header>
        <Typography.SansTitleL tag='h5'>{textProvider(languageCode, Texts.SolutionsWidgetTitle)}</Typography.SansTitleL>
        {moreLink && (
          <Link
            text={textProvider(languageCode, Texts.SolutionsWidgetLink)}
            size='m'
            appearance='neutral'
            onClick={moreLink?.onClick}
            href={moreLink?.href}
            external
          />
        )}
      </S.Header>
      <S.Cards data-mobile={isMobile || undefined}>
        {cards.map(({ description, title, onClick }) => (
          <CardSuggest
            className={S.cardClassName}
            key={title}
            description={description}
            title={title}
            onClick={onClick}
          />
        ))}
      </S.Cards>
    </S.Wrapper>
  );
}
