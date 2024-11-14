import { CalculatorType } from './CalculatorType';
import { AnyType, FormValues } from './FormValues';
import { Price } from './Price';

export type FetcherFnProps = {
  /** Продукт */
  productId: string;
  /** Конфигурация продукта */
  formData: AnyType;
  /** Тип калькулятора */
  calculatorType: CalculatorType;
};

export type FetcherFnResponse =
  | {
      /** Цена */
      price: Price;
      /** Цены по отдельным опциям */
      priceList?: FormValues;
      /** Дополнительные поля по продукту */
      values?: FormValues;
    }
  | undefined;

/** Функция для запроса цен по продукту */
export type FetcherFn = (props: FetcherFnProps) => Promise<FetcherFnResponse>;
