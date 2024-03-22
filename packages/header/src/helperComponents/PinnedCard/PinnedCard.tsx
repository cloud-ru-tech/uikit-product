import { CardSuggest, CardSuggestProps } from '@sbercloud/uikit-product-card-predefined';

export type PinnedCardProps = Omit<CardSuggestProps, 'data-test-id'>;

export function PinnedCard(props: PinnedCardProps) {
  return <CardSuggest {...props} data-test-id='header__pinned-card' />;
}
