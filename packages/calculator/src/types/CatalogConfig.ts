import { Category } from './Category';
import { Platform, PlatformType } from './Platform';
import { Product } from './Product';

/** Конфигурация каталога */
export type CatalogConfig = {
  /** Платформы */
  platforms: Platform[];
  /** Продукты */
  products: Record<string, Product>;
  /** Каталог */
  catalog: Record<PlatformType, Category[]>;
};
