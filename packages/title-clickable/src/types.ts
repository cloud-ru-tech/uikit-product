import { AnchorHTMLAttributes, JSXElementConstructor, MouseEventHandler, ReactNode } from 'react';

import { AvatarProps } from '@snack-uikit/avatar';
import { Tag } from '@snack-uikit/typography';
import { WithSupportProps } from '@snack-uikit/utils';

export type TitleClickableProps = WithSupportProps<{
  /** Аватар */
  avatar?: AvatarProps & {
    subtitle: string;
  };

  /** Заголовок */
  title?: string;

  /** Дочерний компонент */
  children?: ReactNode;

  /** Иконка */
  icon?: JSXElementConstructor<{ size?: number; className?: string }>;

  /** Занимает ли всю ширину **/
  fullWidth?: boolean;

  /** Ссылка */
  href: string;

  /** HTML-атрибут target */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];

  /** Колбек обработки клика */
  onClick?: MouseEventHandler<HTMLAnchorElement>;

  /** CSS-класс */
  className?: string;

  /** Тег заголовка для семантики */
  titleTag?: Tag;
}>;
