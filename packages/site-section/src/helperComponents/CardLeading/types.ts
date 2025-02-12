import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export type CardLeadingItem = WithSupportProps<{
  /** Заголовок карточки, значение */
  value: string;
  /** Подзаголовок карточки */
  label: string;
  /** Описание карточки */
  description: string;
  /** Ссылка на картинку */
  image: string;
}>;
