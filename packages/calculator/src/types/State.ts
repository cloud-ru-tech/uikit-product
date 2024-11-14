import { CalculatorType } from './CalculatorType';
import { ProductState } from './ProductState';

export type State = {
  products: Record<string, ProductState[]>;
  calculatorType: CalculatorType;
};
