import { ValueOf } from '@snack-uikit/utils';

import { TagPredefinedCommonProps, TagProps } from '../types';

export const PROMO_TYPE = {
  Free: 'free',
  FreeConfiguration: 'free-configuration',
  FreeStart: 'free-start',
  BonusRubles: 'bonus-rubles',
  Registration: 'registration',
  Available: 'available',
  Legal: 'legal',
  Record: 'record',
  Preview: 'preview',
} as const;

export type TagPromoProps = TagPredefinedCommonProps & {
  type: ValueOf<typeof PROMO_TYPE>;
  variant: 'promo';
};

export const getTagPromoProps = (type: TagPromoProps['type']): TagProps => {
  switch (type) {
    case PROMO_TYPE.Free:
      return {
        text: 'Бесплатно',
        appearance: 'blue',
      };
    case PROMO_TYPE.FreeConfiguration:
      return {
        text: 'Бесплатная конфигурация',
        appearance: 'blue',
        tip: 'При бесплатном использовании ресурсы предоставляются исключительно для тестирования в рамках рекламной кампании. Не подразумевается безвозмездное предоставление ресурсов по смыслу пп. 4 п.1 ст. 575 ГК РФ.',
      };
    case PROMO_TYPE.FreeStart:
      return {
        text: 'Бесплатный старт',
        appearance: 'blue',
        tip: 'При бесплатном использовании ресурсы предоставляются исключительно для тестирования в рамках рекламной кампании. Не подразумевается безвозмездное предоставление ресурсов по смыслу пп. 4 п.1 ст. 575 ГК РФ.',
      };
    case PROMO_TYPE.BonusRubles:
      return {
        text: '4 000 бонусных рублей',
        appearance: 'blue',
        tip: 'Получите 4000 бонусных рублей на 60 дней за привязку банковской карты',
      };
    case PROMO_TYPE.Registration:
      return {
        text: 'Регистрация открыта',
        appearance: 'violet',
      };
    case PROMO_TYPE.Available:
      return {
        text: 'Доступно всем',
        appearance: 'green',
      };
    case PROMO_TYPE.Legal:
      return {
        text: 'Только для юрлиц',
        appearance: 'violet',
      };
    case PROMO_TYPE.Record:
      return {
        text: 'Доступна запись',
        appearance: 'violet',
      };
    case PROMO_TYPE.Preview:
      return {
        text: 'Preview',
        appearance: 'blue',
      };
    default:
      return null;
  }
};
