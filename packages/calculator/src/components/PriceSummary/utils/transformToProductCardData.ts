import { PLATFORM } from '../../../constants';
import { ProductsState } from '../../../contexts';
import { FormValues, PlatformType, Product as ProductConfig, ProductState } from '../../../types';

export type ProductCardType = {
  label: string;
  productQuantity: number;
  id: string;
  idx: number;
  formData: FormValues;
};

export function transformValueToProductCardData(products: Record<string, ProductConfig>, value: ProductsState) {
  return Object.keys(value).reduce(
    (res, productId) => {
      const cards: ProductCardType[] = value[productId].map(({ data }: ProductState, idx: number) => ({
        idx,
        id: productId,
        label: products[productId].label + (value[productId].length > 1 ? ` ${idx + 1}` : ''),
        productQuantity: data?.productQuantity,
        formData: data,
      }));

      res[products[productId].platform] = res[products[productId].platform].concat(cards);

      return res;
    },
    {
      [PLATFORM.Evolution]: [],
      [PLATFORM.Advanced]: [],
      [PLATFORM.VmWare]: [],
      [PLATFORM.MlSpace]: [],
      [PLATFORM.Test]: [],
    } as Record<PlatformType, ProductCardType[]>,
  );
}
