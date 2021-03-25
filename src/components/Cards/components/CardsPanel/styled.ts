import { styled } from '@linaria/react';

export const ContainerStyled = styled.div<{
  autoFill?: boolean;
  cardsPerRow: number;
}>`
  display: grid;
  grid-gap: 1rem;
  width: '100%';
  grid-template-columns: repeat(
    ${({ cardsPerRow, autoFill }) => (autoFill ? 'auto-fill' : cardsPerRow)},
    minmax(min(270px, 100%), 1fr)
  );
`;

export const CardsPanelStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
