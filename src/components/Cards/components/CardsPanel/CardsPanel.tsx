import { FC } from 'react';

import { StyledContainer } from './styled';

export interface ICardsPanelProps {
  className?: string;
  cardsPerRow?: number;
}

export const CardsPanel: FC<ICardsPanelProps> = ({
  children,
  className,
  cardsPerRow = 4,
}) => (
  <StyledContainer cardsPerRow={cardsPerRow} className={className}>
    {children}
  </StyledContainer>
);
