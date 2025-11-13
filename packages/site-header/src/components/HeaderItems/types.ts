export type LinkItem = {
  /** id Элемента */
  id: string;
  /** Текст элемента */
  label: string;
  /** Хэндлер клика элемента */
  onClick?: () => void;
  /** Ссылка элемента */
  href?: string;
  /** target для ссылки элемента */
  target?: string;
  /** className для элемента списка */
  className?: string;
  /** Кастомные data-атрибуты для a/b теста и тд */
  dataAttributes?: {
    [key: string]: string;
  };
};
