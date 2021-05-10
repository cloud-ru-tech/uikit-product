import { FC } from 'react';

import {
  ContainerStyled,
  AdditionalHoverStyled,
  CardContentWrapStyled,
  AdditionalHoverImageStyled,
} from './styled';

export interface ICardProps {
  className?: string;
  isVertical: boolean;
  selected?: boolean;
  hoverClassName?: string;
  additionalHover?: boolean;
  additionalHoverImage?: string;
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
  additionalHoverImage,
}) => {
  const handlerCardClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    const target = e.target as HTMLButtonElement;
    if (
      (target?.id !== 'more-button' ||
        target?.parentElement?.id !== 'more-button') &&
      onClick
    ) {
      onClick(e);
    }
  };

  return (
    <ContainerStyled
      className={className}
      type='button'
      onClick={handlerCardClick}
      selected={selected}
      additionalHover={additionalHover}
    >
      {additionalHover ? (
        <AdditionalHoverStyled
          data-additional-hover
          isVertical={isVertical}
          className={hoverClassName}
        >
          <AdditionalHoverImageStyled
            additionalHoverImage={additionalHoverImage}
          />
        </AdditionalHoverStyled>
      ) : null}
      <CardContentWrapStyled>{children}</CardContentWrapStyled>
    </ContainerStyled>
  );
};
