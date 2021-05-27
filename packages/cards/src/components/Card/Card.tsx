import { FC } from 'react';

import { AdditionalHoverImageStyled, AdditionalHoverStyled, CardContentWrapStyled, ContainerStyled } from './styled';

export type CardProps = {
  className?: string;
  isVertical: boolean;
  selected?: boolean;
  hoverClassName?: string;
  additionalHover?: boolean;
  additionalHoverImage?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Card: FC<CardProps> = ({
  children,
  onClick,
  selected,
  className,
  isVertical,
  hoverClassName,
  additionalHover,
  additionalHoverImage,
}) => (
  <ContainerStyled
    className={className}
    type='button'
    onClick={onClick}
    selected={selected}
    additionalHover={additionalHover}
  >
    {additionalHover ? (
      <AdditionalHoverStyled data-additional-hover isVertical={isVertical} className={hoverClassName}>
        <AdditionalHoverImageStyled additionalHoverImage={additionalHoverImage} />
      </AdditionalHoverStyled>
    ) : null}
    <CardContentWrapStyled>{children}</CardContentWrapStyled>
  </ContainerStyled>
);
