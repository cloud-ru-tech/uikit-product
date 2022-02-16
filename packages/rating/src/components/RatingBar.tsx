import { FavouriteInterfaceSVGStyled, IconWrapper, MarkContainer } from './styled';

export type RatingBarProps = {
  value?: string;
  disabled?: boolean;
  elements?: number;
  onChange: (value: string) => void;
};

export const RatingBar = ({ value, elements = 5, disabled = false, onChange }: RatingBarProps): JSX.Element => {
  const handleMarkClick = (value: string) => {
    onChange(value);
  };

  const marksArray = Array.from({ length: elements }, (_, index) => `${index + 1}`);

  return (
    <MarkContainer>
      {marksArray.map(mark => (
        <IconWrapper key={mark} onClick={() => handleMarkClick(mark)} data-disabled={disabled || undefined}>
          <FavouriteInterfaceSVGStyled
            size={28}
            data-selected={(value && Number(value) >= Number(mark)) || undefined}
          />
        </IconWrapper>
      ))}
    </MarkContainer>
  );
};
