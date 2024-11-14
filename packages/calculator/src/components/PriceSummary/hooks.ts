import { RefObject, useEffect } from 'react';

import { useCalculatorContext } from '../../contexts';

type UseScrollListToActiveProductProps = {
  scrollRef: RefObject<HTMLDivElement>;
  activeRef: RefObject<HTMLDivElement>;
};

export function useScrollListToActiveProduct({ scrollRef, activeRef }: UseScrollListToActiveProductProps) {
  const { selectedProduct, products } = useCalculatorContext();

  function scrollListToActiveProduct() {
    if (!scrollRef.current) return;

    const activeProduct = activeRef.current;
    const container = scrollRef.current;

    if (!activeProduct) return;

    const activeProductRect = activeProduct.getBoundingClientRect();
    const containerRefRect = container.getBoundingClientRect();
    const currentScrollTop = container.scrollTop;
    const scrollDistance = activeProductRect.top - containerRefRect.top + currentScrollTop - 320 / 2 + 50;

    container.scroll({
      top: scrollDistance,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    scrollListToActiveProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct, Object.keys(products).length]);
}
