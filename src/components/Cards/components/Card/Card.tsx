import { FC } from 'react';

import {
  StyledContainer,
  StyledAdditionalHover,
  StyledCardContentWrap,
  StyledAdditionalHoverImage,
} from './styled';

export interface ICardProps {
  className?: string;
  isVertical: boolean;
  selected?: boolean;
  hoverClassName?: string;
  additionalHover?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Card: FC<ICardProps> = ({
  children,
  onClick,
  selected,
  className,
  isVertical,
  hoverClassName,
  additionalHover,
}) => (
  <StyledContainer
    className={className}
    type='button'
    onClick={onClick}
    selected={selected}
    additionalHover={additionalHover}
  >
    {additionalHover ? (
      <StyledAdditionalHover
        data-additional-hover
        isVertical={isVertical}
        className={hoverClassName}
      >
        <StyledAdditionalHoverImage />
      </StyledAdditionalHover>
    ) : null}
    <StyledCardContentWrap>{children}</StyledCardContentWrap>
  </StyledContainer>
);
