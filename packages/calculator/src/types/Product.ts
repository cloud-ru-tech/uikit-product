import { JSXElementConstructor } from 'react';

import { FormConfig } from '../components';
import { PlatformType } from './Platform';

export type Product = {
  /** Уникальный id */
  id: string;
  /** Название продукта */
  label: string;
  /** Дополнительное описание */
  caption: string;
  /** Иконка */
  icon: JSXElementConstructor<{
    size?: number;
    className?: string;
  }>;
  /** Платформа */
  platform: PlatformType;
  /** data-test-id */
  dataTestId?: string;
  /** Флаг является ли продукт фритирным */
  freeTier?: boolean;
  /** Можно ли менять кол-во продуктов текущей конфигурации в чеке */
  enableChangeProductQuantity?: boolean;
  /** Задизейблить изменение количества продуктов */
  disabledProductQuantity?: boolean;
  /** Ограничить минимальное и максимальное количество продукта */
  productQuantityValues?: {
    min?: number;
    max?: number;
  };
  /** Можно ли подключить продукта в консоли */
  enableConnectToConsole?: boolean;
  /** Конфиг страницы расчета по продукту */
  formConfig?: FormConfig;
  /** Имеет ли продукт сервисы hasPayaGo (только с помесячной тарификацией) */
  hasPayaGo?: boolean;
};
