import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  NoAccessTitle = 'NoAccessTitle',
  NoAccessSubtitle = 'NoAccessSubtitle',
  NoAccessText = 'NoAccessText',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.NoAccessTitle]: 'Доступ ограничен',
    [Texts.NoAccessSubtitle]: 'У вас нет прав для просмотра этого контента.',
    [Texts.NoAccessText]: 'Для получения доступа обратитесь к администратору организации или проекта',
  },
  [LanguageCodeType.enGB]: {
    [Texts.NoAccessTitle]: 'Access restricted',
    [Texts.NoAccessSubtitle]: "You don't have rights to view this content.",
    [Texts.NoAccessText]: 'To gain access, contact the administrator of the organization or project',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'no-access');
