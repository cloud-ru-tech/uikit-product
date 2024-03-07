import { Card, CardProps } from '@snack-uikit/card';
import { ArrowRightSVG } from '@snack-uikit/icons';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

export type CardServiceProps = WithSupportProps<
  Pick<CardProps, 'onClick' | 'className' | 'disabled'> &
    Required<Pick<Card.HeaderProps, 'title' | 'emblem'>> & {
      description: string;
      actionLabel: string;
    }
>;

export function CardService({
  title,
  description,
  actionLabel,
  emblem,
  onClick,
  className,
  disabled,
  ...rest
}: CardServiceProps) {
  return (
    <Card
      // TODO: typescript error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {...extractSupportProps(rest)}
      disabled={disabled}
      className={className}
      header={<Card.Header title={title} emblem={emblem} truncate={{ title: 2 }} />}
      onClick={onClick}
      footer={<Card.Footer.CallToAction label={actionLabel} icon={<ArrowRightSVG />} />}
    >
      <TruncateString text={description} maxLines={3} data-test-id='card-service__description' />
    </Card>
  );
}
