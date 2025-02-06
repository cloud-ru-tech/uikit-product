import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  // SectionBasic
  ShowMore = 'showMore',

  // SectionLeading
  IaasValue = 'iaasValue',
  IaasLabel = 'iaasLabel',
  IaasDescription = 'iaasDescription',
  PaasValue = 'paasValue',
  PaasLabel = 'paasLabel',
  PaasDescription = 'paasDescription',
  AiValue = 'aiValue',
  AiLabel = 'aiLabel',
  AiDescription = 'AiDescription',

  // SectionPersonalManager
  PersonalManagerTitle = 'personalManagerTitle',
  PersonalManagerSubtitle = 'personalManagerSubtitle',
  IndividualApproachTitle = 'individualApproachTitle',
  IndividualApproachDescription = 'individualApproachDescription',
  ConsultationButton = 'consultationButton',
  AllDaySupportTitle = 'allDaySupportTitle',
  AllDaySupportDescription = 'allDaySupportDescription',
  ArgumentAmountOfExperts = 'argumentAmountOfExperts',
  ArgumentMethodologies = 'argumentMethodologies',
  ArgumentPersonalManager = 'argumentPersonalManager',
}

export type DictionaryPropertyAsFn = (params: string) => string;
type DictionaryProperty = DictionaryPropertyAsFn | string;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    // SectionBasic
    [Texts.ShowMore]: 'Показать ещё',
    // SectionLeading
    [Texts.IaasValue]: '№1',
    [Texts.IaasLabel]: 'по темпам роста IaaS',
    [Texts.IaasDescription]: 'iKS-Consulting, 2024',
    [Texts.PaasValue]: '№1',
    [Texts.PaasLabel]: 'в сегменте PaaS',
    [Texts.PaasDescription]: 'iKS-Consulting, 2024',
    [Texts.AiValue]: '№1',
    [Texts.AiLabel]: 'на рынке AI',
    [Texts.AiDescription]: 'CNews Analytics, 2023',
    // SectionPersonalManager
    [Texts.PersonalManagerTitle]: 'Больше чем просто поддержка',
    [Texts.PersonalManagerSubtitle]: 'Полное сопровождение для решения ваших задач и понятный бизнес-результат',
    [Texts.IndividualApproachTitle]: 'Индивидуальный подход к каждому клиенту',
    [Texts.IndividualApproachDescription]:
      'Проведем бесплатную консультацию по вашему проекту, ответим на вопросы и подберем лучшие решения.',
    [Texts.ConsultationButton]: 'Получить консультацию',
    [Texts.AllDaySupportTitle]: 'Круглосуточно на связи',
    [Texts.AllDaySupportDescription]: 'Бесплатная техподдержка 24/7, на связи всегда реальные люди.',
    [Texts.ArgumentAmountOfExperts]: '1 400+ экспертов в области IT, кибербезопасности и AI',
    [Texts.ArgumentMethodologies]: 'Проверенные методологии и лучшие практики бесшовной миграции в облако',
    [Texts.ArgumentPersonalManager]: 'Персональный менеджер для сопровождения ваших задач',
  },
  [LanguageCodeType.enGB]: {
    // SectionBasic
    [Texts.ShowMore]: 'Show More',
    // SectionLeading
    [Texts.IaasValue]: '№1',
    [Texts.IaasLabel]: 'growth rate in IaaS',
    [Texts.IaasDescription]: 'iKS-Consulting, 2024',
    [Texts.PaasValue]: '№1',
    [Texts.PaasLabel]: 'in PaaS segment',
    [Texts.PaasDescription]: 'iKS-Consulting, 2024',
    [Texts.AiValue]: '№1',
    [Texts.AiLabel]: 'on AI market',
    [Texts.AiDescription]: 'CNews Analytics, 2023',
    // SectionPersonalManager
    [Texts.PersonalManagerTitle]: 'More than regular support',
    [Texts.PersonalManagerSubtitle]: 'Full support for solving your problems and achieving business results',
    [Texts.IndividualApproachTitle]: 'Individual approach to every client',
    [Texts.IndividualApproachDescription]:
      'Free consultation for your project. We will answer your questions and select the best solutions.',
    [Texts.ConsultationButton]: 'Get a consultation',
    [Texts.AllDaySupportTitle]: 'On call 24/7',
    [Texts.AllDaySupportDescription]: 'Free technical support 24/7, real people are always in touch.',
    [Texts.ArgumentAmountOfExperts]: '1,400+ experts in IT, cybersecurity and AI',
    [Texts.ArgumentMethodologies]: 'Proven methodologies and best practices for seamless cloud migration',
    [Texts.ArgumentPersonalManager]: 'Personal manager to assist with your tasks',
  },
};

export const textProvider = createTextProvider<Texts, DictionaryProperty>(Dictionary, 'modal-predefined');
