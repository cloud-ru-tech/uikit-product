import { styled } from '@linaria/react';

export const Container = styled.div<{
  autoFill?: boolean;
  cardsPerRow: number;
}>`
  display: grid;
  grid-gap: 1rem;
  width: 100%;
  grid-template-columns: repeat(
    ${({ cardsPerRow, autoFill }) => (autoFill ? 'auto-fill' : cardsPerRow)},
    minmax(min(300px, 100%), 1fr)
  );
`;

export const CardsPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PageWrapper = styled.div`
  margin: 8px 0;
`;
