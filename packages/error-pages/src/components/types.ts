import type { ButtonFilledProps } from '@snack-uikit/button';

import type { ErrorType } from './constants';

export type MainButtonConfig = Pick<ButtonFilledProps, 'label' | 'href' | 'onClick' | 'icon'>;

export type ErrorPageCustomConfig = {
  /**
   * Кастомный заголовок.
   */
  title?: string;
  /**
   * Кастомный текст под заголовком.
   */
  text?: string;
  /**
   * Кастомный код статуса.
   */
  statusCode?: number;
  /**
   * Кастомные настройки основной кнопки.
   */
  mainButton?: MainButtonConfig;
  /**
   * Принудительно показать/скрыть ссылку на главную страницу.
   * Если не задано, используется поведение по умолчанию.
   */
  showMainPageLink?: boolean;
  /**
   * Принудительно показать/скрыть ссылку "Назад".
   * Если не задано, используется поведение по умолчанию.
   */
  showBackLink?: boolean;
  /**
   * Кастомный класс для контейнера с действиями.
   */
  actionWrapperClassName?: string;
};

export type ErrorTypeConfig =
  | {
      errorType: ErrorType.Custom;
      custom?: ErrorPageCustomConfig;
    }
  | {
      errorType: Exclude<ErrorType, ErrorType.Custom>;
      custom?: never;
    };
