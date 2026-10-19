import { ProductsState, useCalculatorContext } from '../contexts';
import { filterNonEmptyArrays } from '../utils/filterNonEmptyArrays';

const deleteItem =
  (productId: string, idx: number) =>
  (oldValue: ProductsState): ProductsState => {
    const oldArrayValue = oldValue[productId];

    if (!oldArrayValue) {
      return oldValue;
    }

    return filterNonEmptyArrays({
      ...oldValue,
      [productId]: oldArrayValue.filter((_, itemIdx) => itemIdx !== idx),
    });
  };

export function useProductDelete() {
  const {
    setSelectedProduct,
    selectedProduct,
    products,
    setProducts,
    actions: { onProductDelete },
  } = useCalculatorContext();

  return (productId: string, idx: number) => {
    const nextProducts = deleteItem(productId, idx)(products);

    setProducts(deleteItem(productId, idx));

    onProductDelete?.(productId);

    if (selectedProduct?.id !== productId) {
      return;
    }

    if (selectedProduct.idx > idx) {
      setSelectedProduct({ id: productId, idx: selectedProduct.idx - 1 });
      return;
    }

    if (selectedProduct.idx === idx) {
      const newProductId = Object.keys(nextProducts).find(id => nextProducts[id].length > 0);

      setSelectedProduct(newProductId ? { id: newProductId, idx: 0 } : null);
    }
  };
}
