import { Card, CardProps } from '@snack-uikit/card';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

export type CardServiceSmallProps = WithSupportProps<
  Pick<CardProps, 'promoBadge' | 'onClick' | 'className' | 'disabled'> &
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
  ...rest
}: CardServiceSmallProps) {
  return (
    <Card
      // TODO: typescript error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {...extractSupportProps(rest)}
      className={className}
      header={<Card.Header title={title} emblem={emblem} truncate={truncate} />}
      promoBadge={promoBadge}
      onClick={onClick}
      disabled={disabled}
      size='s'
    />
  );
}
