import { CardSuggest, CardSuggestProps } from '@sbercloud/uikit-product-card-predefined';

export type PinnedCardProps = CardSuggestProps & {
  id: string;
};

export function PinnedCard(props: PinnedCardProps) {
  return <CardSuggest {...props} />;
}
