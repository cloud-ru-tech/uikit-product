import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  SolutionsWidgetTitle = 'solutions-widget-title',
  SolutionsWidgetLink = 'solutions-widget-link',

  ProductsWidgetTitle = 'products-widget-title',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.SolutionsWidgetTitle]: 'Руководства для быстрого старта',
    [Texts.SolutionsWidgetLink]: 'Смотреть все',

    [Texts.ProductsWidgetTitle]: 'Сервисы платформы',
  },
  [LanguageCodeType.enGB]: {
    [Texts.SolutionsWidgetTitle]: 'Quick start guides',
    [Texts.SolutionsWidgetLink]: 'View all',

    [Texts.ProductsWidgetTitle]: 'Platform services',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'navigation');
