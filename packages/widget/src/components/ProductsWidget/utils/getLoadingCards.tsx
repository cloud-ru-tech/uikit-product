import { Skeleton } from '@snack-uikit/skeleton';

import { COLUMN_SIZE, ROW_SIZE } from '../constants';

type GetLoadingCardsParams = {
  columnSize?: number;
  rowSize?: number;
};

export function getLoadingCards({ columnSize = COLUMN_SIZE, rowSize = ROW_SIZE }: GetLoadingCardsParams) {
  const result = [];

  for (let i = 0; i < rowSize; i++) {
    const columnSkeletons = [];
    for (let j = 0; j < columnSize; j++) {
      columnSkeletons.push(<Skeleton loading borderRadius={8} height={48} />);
    }

    result.push(columnSkeletons);
  }

  return result;
}
