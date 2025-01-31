import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  // SectionBasic
  ShowMore = 'showMore',

  // SectionCardLeading
  IaasValue = 'iaasValue',
  IaasLabel = 'iaasLabel',
  IaasDescription = 'iaasDescription',
  PaasValue = 'paasValue',
  PaasLabel = 'paasLabel',
  PaasDescription = 'paasDescription',
  AiValue = 'aiValue',
  AiLabel = 'aiLabel',
  AiDescription = 'AiDescription',
}

export type DictionaryPropertyAsFn = (params: string) => string;
type DictionaryProperty = DictionaryPropertyAsFn | string;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    // SectionBasic
    [Texts.ShowMore]: 'Показать ещё',
    // SectionCardLeading
    [Texts.IaasValue]: '№1',
    [Texts.IaasLabel]: 'по темпам роста IaaS',
    [Texts.IaasDescription]: 'iKS-Consulting, 2024',
    [Texts.PaasValue]: '№1',
    [Texts.PaasLabel]: 'в сегменте PaaS',
    [Texts.PaasDescription]: 'iKS-Consulting, 2024',
    [Texts.AiValue]: '№1',
    [Texts.AiLabel]: 'на рынке AI',
    [Texts.AiDescription]: 'CNews Analytics, 2023',
  },
  [LanguageCodeType.enGB]: {
    // SectionBasic
    [Texts.ShowMore]: 'Show More',
    // SectionCardLeading
    [Texts.IaasValue]: '№1',
    [Texts.IaasLabel]: 'growth rate in IaaS',
    [Texts.IaasDescription]: 'iKS-Consulting, 2024',
    [Texts.PaasValue]: '№1',
    [Texts.PaasLabel]: 'in PaaS segment',
    [Texts.PaasDescription]: 'iKS-Consulting, 2024',
    [Texts.AiValue]: '№1',
    [Texts.AiLabel]: 'on AI market',
    [Texts.AiDescription]: 'CNews Analytics, 2023',
  },
};

export const textProvider = createTextProvider<Texts, DictionaryProperty>(Dictionary, 'modal-predefined');
