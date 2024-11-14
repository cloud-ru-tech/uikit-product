import { useCalculatorContext } from '../contexts';
import { FormValues } from '../types';
import { filterNonEmptyArrays } from '../utils/filterNonEmptyArrays';

const deleteItem = (productId: string, idx: number) => (oldValue: FormValues) => {
  const oldArrayValue = oldValue[productId ?? 0];

  if (!oldArrayValue) {
    return oldValue;
  }

  oldArrayValue.splice(idx ?? 0, 1);

  const newValue = {
    ...oldValue,
    [productId]: oldArrayValue,
  };

  return { ...filterNonEmptyArrays(newValue) };
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
    setProducts(deleteItem(productId, idx));

    onProductDelete?.(productId);

    if (selectedProduct?.id === productId && selectedProduct?.idx === idx) {
      const newProductId = Object.keys(products).find(productId => products[productId].length > 0);

      if (newProductId) {
        setSelectedProduct({ id: newProductId, idx: 0 });
      } else {
        setSelectedProduct(null);
      }
    }
  };
}
