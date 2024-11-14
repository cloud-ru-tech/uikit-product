import { useCallback } from 'react';

import { useCalculatorContext } from '../contexts';

export function useProductClick() {
  const { setSelectedProduct } = useCalculatorContext();

  return useCallback(
    (productId: string, idx: number) => {
      setSelectedProduct({ id: productId, idx });
    },
    [setSelectedProduct],
  );
}
