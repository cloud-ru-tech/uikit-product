import { ReactNode } from 'react';

type GetProductColumnsParams = {
  cards: ReactNode[];
  columnSize: number;
  rowSize: number;
};

export function getProductColumns({ cards, columnSize }: GetProductColumnsParams) {
  const result = [];

  for (let i = 0; i < cards.length; i += columnSize) {
    const innerCards = [];

    for (let j = 0; j < columnSize; j++) {
      const index = i + j;
      if (index >= cards.length) {
        break;
      }

      const card = cards[index];

      innerCards.push(card);
    }

    result.push(innerCards);
  }

  return result;
}
