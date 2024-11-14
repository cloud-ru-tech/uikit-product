import { ReactNode } from 'react';

export type Category = {
  /** Уникальный идентификатор категории */
  id: string;
  /** Название */
  label: string;
  /** data-test-id */
  dataTestId: string;
  /** Массив Id продуктов отображаемых в категории */
  visibleProducts: string[];
  /** Слот для "промо" баннера */
  banner?: ReactNode;
};
