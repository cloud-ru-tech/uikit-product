import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  TooltipService = 'tooltipService',
  TooltipFunctional = 'tooltipFunctional',
  Text = 'text',
}

export type DictionaryPropertyAsFn = (params: string) => string;
type DictionaryProperty = DictionaryPropertyAsFn | string;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Text]: 'Preview',
    [Texts.TooltipService]:
      'Сервис находится в стадии Preview. Для него недоступно увеличение квоты и не действуют условия тарификации, SLA сервиса и поддержки.',
    [Texts.TooltipFunctional]:
      'Функциональность находится в стадии Preview. Для нее не действуют условия тарификации, SLA сервиса и поддержки.',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Text]: 'Preview',
    [Texts.TooltipService]:
      'The service is at the Preview stage. Quota increase is not available for it and the terms of billing, service SLA and support do not apply.',
    [Texts.TooltipFunctional]:
      'The functionality is at the Preview stage. Billing, service SLA and support conditions do not apply to it.',
  },
};

export const textProvider = createTextProvider<Texts, DictionaryProperty>(Dictionary, 'modal-predefined');
