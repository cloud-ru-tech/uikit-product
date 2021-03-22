import { styled } from '@linaria/react';

export const StyledContainer = styled.div<{ cardsPerRow: number }>`
  display: grid;
  grid-gap: 1rem;
  width: 100%;
  grid-template-columns: repeat(
    ${({ cardsPerRow }) =>
      cardsPerRow * 270 > window.innerWidth ? 'auto-fill' : cardsPerRow},
    minmax(min(270px, 100%), 1fr)
  );
`;
