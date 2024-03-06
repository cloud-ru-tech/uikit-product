import { CardServiceSmall } from '@sbercloud/uikit-product-card-predefined';

import { COLUMN_SIZE } from '../constants';
import { ProductProps } from '../types';

type GetProductColumnsParams = {
  products: ProductProps[];
  columnSize?: number;
  rowSize?: number;
};

export function getProductColumns({ products, columnSize = COLUMN_SIZE }: GetProductColumnsParams) {
  const result = [];

  for (let i = 0; i < products.length; i += columnSize) {
    const innerCards = [];

    for (let j = 0; j < columnSize; j++) {
      const index = i + j;
      if (index >= products.length) {
        break;
      }

      const product = products[index];

      innerCards.push(<CardServiceSmall {...product} />);
    }

    result.push(innerCards);
  }

  return result;
}
