import { getDefaultValues } from '../components';
import { DEFAULT_CATEGORY, DEFAULT_PRICE } from '../constants';
import { ProductsState, useCalculatorContext } from '../contexts';

export function useCatalogCardClick() {
  const {
    setSelectedProduct,
    config,
    setCatalogOpen,
    products,
    setProducts,
    setSelectedCategory,
    actions: { onProductSelect },
  } = useCalculatorContext();

  return (productId: string) => {
    onProductSelect?.(productId);

    setProducts((oldValue: ProductsState) => ({
      ...oldValue,
      [productId]: (oldValue[productId] ?? []).concat([
        {
          data: { ...getDefaultValues(config.products[productId].formConfig?.controls ?? {}), productQuantity: 1 },
          price: DEFAULT_PRICE,
        },
      ]),
    }));

    setSelectedProduct({
      id: productId,
      idx: products[productId]?.length || 0,
    });

    setSelectedCategory(DEFAULT_CATEGORY);
    setCatalogOpen(false);
  };
}
