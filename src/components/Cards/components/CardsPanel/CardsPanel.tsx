import { FC } from 'react';

import { ContainerStyled } from './styled';

export interface ICardsPanelProps {
  className?: string;
  autoFill?: boolean;
  cardsPerRow?: number;
}

export const CardsPanel: FC<ICardsPanelProps> = ({
  children,
  autoFill,
  className,
  cardsPerRow = 4,
}) => (
  <ContainerStyled
    autoFill={autoFill}
    className={className}
    cardsPerRow={cardsPerRow}
  >
    {children}
  </ContainerStyled>
);
