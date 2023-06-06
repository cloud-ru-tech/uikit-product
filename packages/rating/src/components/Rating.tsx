import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { FavouriteInterfaceSVGStyled, IconWrapper, MarkContainer } from './styled';

export type RatingProps = WithSupportProps<{
  value?: number;
  disabled?: boolean;
  elements?: number;
  className?: string;
  onChange: (value: number) => void;
}>;

export function Rating({
  value,
  elements = 5,
  disabled = false,
  onChange,
  className,
  ...rest
}: RatingProps): JSX.Element {
  const handleMarkClick = (value: number) => {
    onChange(value);
  };

  const marksArray = Array.from({ length: elements }, (_, index) => index + 1);

  return (
    <MarkContainer {...extractSupportProps(rest)} className={className}>
      {marksArray.map(mark => (
        <IconWrapper key={mark} onClick={() => handleMarkClick(mark)} data-disabled={disabled || undefined}>
          <FavouriteInterfaceSVGStyled size={28} data-selected={(value && value >= mark) || undefined} />
        </IconWrapper>
      ))}
    </MarkContainer>
  );
}
