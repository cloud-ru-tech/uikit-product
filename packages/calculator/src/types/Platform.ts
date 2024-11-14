import { ReactNode } from 'react';

import { PLATFORM } from '../constants';

type ValueOf<T> = T[keyof T];

export type PlatformType = ValueOf<typeof PLATFORM>;

export type Platform = {
  /** Уникальный id */
  id: PlatformType;
  /** Иконка */
  icon: ReactNode;
  /** Название */
  label: string;
  /** Дополнительное описание */
  description: string;
  /** Доступ к платформе */
  access: 'public' | 'request' | 'legal';
  /** data-test-id */
  dataTestId: string;
  /** Колбек клика на карточку платформы */
  onClick?(id: PlatformType): void;
};
