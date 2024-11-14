import { FormValues } from './FormValues';
import { Price } from './Price';

export type ProductState = {
  /** Конфигурация продукта */
  data: FormValues;
  /** Цена продукта */
  price: Price;
  /** Цены по отдельным опциям */
  priceList?: FormValues;
};
