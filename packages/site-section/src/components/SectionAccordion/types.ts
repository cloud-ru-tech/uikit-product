import { ReactNode } from 'react';

import { CollapseBlockPrimaryProps } from '@snack-uikit/accordion';

/** Элемент аккордиона */
export type AccordionItem = Pick<CollapseBlockPrimaryProps, 'onClick'> & {
  /** Заголовок блока */
  title: string;
  /** Описание блока (rich text) */
  description: string | ReactNode;
};
