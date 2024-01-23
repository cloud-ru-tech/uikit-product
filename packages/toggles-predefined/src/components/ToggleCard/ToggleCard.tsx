import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Card, CardProps } from '@snack-uikit/card';
import { useToggleGroup } from '@snack-uikit/toggles';

export type ToggleCardProps = WithSupportProps<{
  title: string;
  value: string;
  description?: string;
  emblem?: Card.HeaderProps['emblem'];
  promoBadge?: string;
  className?: string;
  disabled?: boolean;
  size?: CardProps['size'];
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
      header={
        <Card.Header
          title={title}
          metadata={description}
          emblem={emblem}
          className={className}
          {...extractSupportProps(rest)}
        />
      }
    />
  );
}
