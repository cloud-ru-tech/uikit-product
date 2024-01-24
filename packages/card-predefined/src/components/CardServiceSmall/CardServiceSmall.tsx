import { Card, CardProps } from '@snack-uikit/card';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

export type CardServiceSmallProps = WithSupportProps<
  Pick<CardProps, 'promoBadge' | 'onClick' | 'className'> & Required<Pick<Card.HeaderProps, 'title' | 'emblem'>>
>;

export function CardServiceSmall({ promoBadge, title, emblem, onClick, className, ...rest }: CardServiceSmallProps) {
  return (
    <Card
      // TODO: typescript error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {...extractSupportProps(rest)}
      className={className}
      header={<Card.Header title={title} emblem={emblem} />}
      promoBadge={promoBadge}
      onClick={onClick}
      size='s'
    />
  );
}
