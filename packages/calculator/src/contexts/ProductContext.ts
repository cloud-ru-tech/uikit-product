import { createContext, useContext } from 'react';

import { DEFAULT_PRICE } from '../constants';
import { AnyType } from '../types';
import { Price } from '../types/Price';

type ProductPageContextType = {
  value: AnyType;
  onChange(value: AnyType): void;

  price?: Price;
  priceList?: Record<string, Price>;
};

const noop = () => {};

export const ProductContext = createContext<ProductPageContextType>({
  value: {},
  onChange: noop,

  price: DEFAULT_PRICE,
  priceList: {},
});

export const useProductContext = () => useContext(ProductContext);
