import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Card, CardProps } from '@snack-uikit/card';
import { useToggleGroup } from '@snack-uikit/toggles';

export type ToggleCardProps = WithSupportProps<{
  title: string;
  truncate?: Pick<NonNullable<Card.HeaderProps['truncate']>, 'title' | 'description'>;
  value: string;
  description?: string;
  emblem?: Card.HeaderProps['emblem'];
  promoBadge?: CardProps['promoBadge'];
  className?: string;
  disabled?: boolean;
  size?: CardProps['size'];
  name?: string;
}>;

export function ToggleCard({
  title,
  emblem,
  description,
  className,
  disabled,
  size,
  value,
  promoBadge,
  truncate,
  name,
  ...rest
}: ToggleCardProps) {
  const { isChecked, handleClick } = useToggleGroup({ value });

  return (
    <Card
      key={title}
      checked={isChecked}
      onClick={!disabled ? handleClick : undefined}
      disabled={disabled}
      size={size}
      outline
      promoBadge={promoBadge}
      name={name}
      header={
        <Card.Header
          title={title}
          description={description}
          emblem={emblem}
          className={className}
          truncate={truncate}
        />
      }
      {...extractSupportProps(rest)}
    />
  );
}
