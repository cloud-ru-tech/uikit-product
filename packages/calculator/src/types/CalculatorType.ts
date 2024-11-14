import { ValueOf } from '@snack-uikit/utils';

export const CALCULATOR_TYPE = {
  /** калькулятор на странице /calculator */
  Main: 'main',
  /** калькулятор на странице партнеров /calculator/partners */
  Partners: 'partners',
  /** калькулятор на страницах продуктах и на промо страницах посвященных продукту */
  Product: 'product',
  /**  остальные калькуляторы на сайте */
  Additional: 'additional',
  /** тестовый калькулятор /calculator/test */
  Test: 'test',
} as const;

export type CalculatorType = ValueOf<typeof CALCULATOR_TYPE>;
