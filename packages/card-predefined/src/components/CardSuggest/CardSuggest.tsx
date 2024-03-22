import { Card, CardProps } from '@snack-uikit/card';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TRUNCATE_DEFAULTS } from './constants';

export type CardSuggestProps = WithSupportProps<
  Pick<CardProps, 'promoBadge' | 'onClick' | 'className' | 'disabled' | 'href'> & {
    size?: 's' | 'm';
    title: string;
    description: string;
    truncate?: {
      title?: number;
      description?: number;
    };
  }
>;

export function CardSuggest({
  title,
  description,
  truncate,
  onClick,
  className,
  disabled,
  href,
  promoBadge,
  size,
  ...rest
}: CardSuggestProps) {
  const truncateLines = { ...TRUNCATE_DEFAULTS, ...truncate };

  return (
    <Card
      // TODO: typescript error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {...extractSupportProps(rest)}
      size={size}
      promoBadge={promoBadge}
      href={href}
      disabled={disabled}
      header={<Card.Header title={title} truncate={{ title: truncateLines.title }} />}
      onClick={onClick}
      className={className}
    >
      <TruncateString
        text={description}
        maxLines={truncateLines.description}
        data-test-id='card-suggest__description'
      />
    </Card>
  );
}
